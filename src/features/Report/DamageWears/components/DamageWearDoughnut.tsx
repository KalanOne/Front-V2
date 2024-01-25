import React, { useState } from "react";

import { Box } from "@mui/material";

import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { DamageStatistic, WearStatistic } from "../types/damageWearsTypes";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export { DamageWearDoughnut };

interface DamageWearDoughnutProps {
  data: any;
  title?: string;
}

function DamageWearDoughnut({
  data,
  title,
}: DamageWearDoughnutProps): React.ReactElement {
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
