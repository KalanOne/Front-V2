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

import { TireRetreadGraphicsResponse } from "../types/tireRetreadTypes";

export { TireRetreadProviderGraphics };

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

interface TireRetreadProviderGraphicsProps {
  data: TireRetreadGraphicsResponse[];
}

function TireRetreadProviderGraphics({
  data,
}: TireRetreadProviderGraphicsProps) {
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
              {
                label: `${t("general:average_days")}`,
                data: data.map((item) => item.average_days),
                borderColor: "#7f531e",
                backgroundColor: "#7f531e",
                pointBackgroundColor: "#7f531e",
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
                      return `${context.dataset.label}: ${context.formattedValue}`;
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
