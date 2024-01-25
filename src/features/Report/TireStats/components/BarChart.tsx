import React from "react";

import { Box } from "@mui/material";

import {
  BarController,
  BarElement,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarController, BarElement, Tooltip, Legend, Title);

export { BarChart };

interface BarChartProps {
  data: any;
  title?: string;
}

function BarChart({ data, title }: BarChartProps): React.ReactElement {
  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data && (
        <Bar
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
                      return `${context.formattedValue}`;
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
