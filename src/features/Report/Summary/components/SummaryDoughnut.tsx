import React from "react";

import { Box } from "@mui/material";

import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

import { percentFormatter } from "src/utils/formatters";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export { SummaryDoughnut };

interface SummaryDoughnutProps {
  data: any;
  title?: string;
}

function SummaryDoughnut({
  data,
  title,
}: SummaryDoughnutProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        mt: 2,
        height: "450px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data && (
        <Doughnut
          data={data}
          options={{
            plugins: {
              legend: {
                position: "bottom" as const,
              },
              title: {
                display: true,
                text: title ? title : "",
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    if (context.formattedValue) {
                      return `${context.label}: ${context.formattedValue} - ${t(
                        "common:tire_plural",
                      )} ${percentFormatter.format(
                        (100 * Number(context.formattedValue)) /
                          context.dataset.data.reduce(
                            (a: number, b: number) => a + b,
                            0,
                          ),
                      )}%`;
                    }
                    return "";
                  },
                },
              },
            },
          }}
        />
      )}
    </Box>
  );
}
