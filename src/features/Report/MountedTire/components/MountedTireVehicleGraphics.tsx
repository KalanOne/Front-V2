import { Card, CardContent } from "@mui/material";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

import { CardHeaderGradient } from "src/components/common/CustomCard";

import { MountedTireGraphicsResponse } from "../types/mountedTireTypes";

export { MountedTireVehicleGraphics };

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

interface MountedTireVehicleGraphicsProps {
  data: MountedTireGraphicsResponse[];
}

function MountedTireVehicleGraphics({ data }: MountedTireVehicleGraphicsProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeaderGradient title={t("titles:historic")} />
      <CardContent>
        <Line
          data={{
            labels: data.map((item) => dayjs(item.date).format("MMM. YYYY")),
            datasets: [
              {
                label: `${t("general:quantity_tire")}`,
                data: data.map((item) => item.total),
                borderColor: "#264864",
                backgroundColor: "#264864",
                pointBackgroundColor: "#264864",
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                position: "bottom" as const,
              },
              title: {
                display: true,
                text: `${t("general:quantity_tire")}`,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    if (context.formattedValue) {
                      return `${t("general:quantity_tire")}: ${
                        context.formattedValue
                      }`;
                    }
                    return "";
                  },
                },
              },
            },
            responsive: true,
          }}
        />
      </CardContent>
    </Card>
  );
}
