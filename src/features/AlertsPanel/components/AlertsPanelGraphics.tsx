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

import { AlertsPanelResponseGraphics } from "../types/alertspanelTypes";

export { AlertsPanelGraphics };

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

interface AlertsPanelGraphicsProps {
  data: AlertsPanelResponseGraphics[];
  options: {
    title: string;
    priority: string;
  };
}

function AlertsPanelGraphics({ data, options }: AlertsPanelGraphicsProps) {
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
                label: options.title,
                data: data.map((item) => item.total),
                borderColor:
                  options.priority === "HIGH"
                    ? "rgba(255, 0, 0, 0.85)"
                    : options.priority === "HALF"
                    ? "rgba(250, 175, 0, 0.85)"
                    : "rgba(0, 128, 40, 0.85)",
                backgroundColor:
                  options.priority === "HIGH"
                    ? "rgba(255, 0, 0, 0.85)"
                    : options.priority === "HALF"
                    ? "rgba(250, 175, 0, 0.85)"
                    : "rgba(0, 128, 40, 0.85)",
                pointBackgroundColor:
                  options.priority === "HIGH"
                    ? "rgba(255, 0, 0, 0.85)"
                    : options.priority === "HALF"
                    ? "rgba(250, 175, 0, 0.85)"
                    : "rgba(0, 128, 40, 0.85)",
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
                text: options.title,
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
