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

import { KmPileHistoricResponse } from "../types/kmPileTypes";

export { KmPileHistoric };

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

interface KmPileHistoricProps {
  data: KmPileHistoricResponse[];
}

function KmPileHistoric({ data }: KmPileHistoricProps) {
  const { t } = useTranslation();

  return (
    <Line
      data={{
        labels: data.map((item) => dayjs(item.fecha).format("MMM. YYYY")),
        datasets: [
          {
            label: `${t("general:quantity_tire")}`,
            data: data.map((item) => item.cantidad),
            borderColor: "#4bc0c0",
            backgroundColor: "#4bc0c0",
            pointBackgroundColor: "#4bc0c0",
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
  );
}
