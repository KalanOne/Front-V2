import { Card, CardContent } from "@mui/material";

import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { useTranslation } from "react-i18next";

import { SummaryDoughnut } from "./SummaryDoughnut";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export { SummaryGraphics };

interface SummaryGraphicsProps {
  summaryData: any;
  type: "pressure" | "depth" | "alert";
}

function SummaryGraphics({ summaryData, type }: SummaryGraphicsProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardContent>
        {Object.entries(getCharDataDivision(summaryData, type, t)).map(
          ([subsidiary, subsidiaryObject]) => (
            <SummaryDoughnut data={subsidiaryObject} title={subsidiary} />
          ),
        )}
      </CardContent>
    </Card>
  );
}

function getCharDataDivision(
  data: any,
  type: "pressure" | "depth" | "alert",
  t: any,
) {
  const chartData: any = {};
  for (const [corporate, corporateObject] of Object.entries(data)) {
    if (["statistics", "percent"].includes(corporate)) {
      continue;
    }
    for (const [company, companyObject] of Object.entries(
      corporateObject as object,
    )) {
      if (["statistics", "percent"].includes(company)) {
        continue;
      }
      for (const [subsidiary, subsidiaryObject] of Object.entries(
        companyObject as object,
      )) {
        if (["statistics", "percent"].includes(subsidiary)) {
          continue;
        }
        for (const [division, divisionObject] of Object.entries(
          subsidiaryObject as object,
        )) {
          if (["statistics", "percent"].includes(division)) {
            continue;
          }
          if (!chartData[division]) {
            chartData[division] = {
              labels: [],
              datasets: [
                {
                  backgroundColor: [],
                  borderColor: [],
                  data: [],
                  borderWidth: 1,
                },
              ],
            };
          }
          for (const [priority, priorityObject] of Object.entries(
            divisionObject as object,
          )) {
            if (["statistics", "percent"].includes(priority)) {
              continue;
            }

            let newLabel = "";
            let newColor = "";

            switch (type) {
              case "pressure":
                if (priority.toLowerCase().includes("high")) {
                  newColor = "#eeacac";
                } else if (priority.toLowerCase().includes("low")) {
                  newColor = "#f3e072";
                } else if (priority.toLowerCase().includes("normal")) {
                  newColor = "#b5f3bf";
                } else {
                  newColor = "#777777";
                }
                newLabel = t(
                  `labels2:summary_report.pressure_condition.${priority
                    .toLowerCase()
                    .replace(" ", "_")}`,
                );
                break;
              case "depth":
                if (priority.toLowerCase().includes("critical")) {
                  newColor = "#eeacac";
                } else if (priority.toLowerCase().includes("scheduled")) {
                  newColor = "#f3e072";
                } else if (priority.toLowerCase().includes("good")) {
                  newColor = "#b5f3bf";
                } else {
                  newColor = "#777777";
                }
                newLabel = t(
                  `labels2:summary_report.depth_condition.${priority
                    .toLowerCase()
                    .replace(" ", "_")}`,
                );
                break;
              case "alert":
                if (priority.toLowerCase().includes("high")) {
                  newColor = "#eeacac";
                } else if (priority.toLowerCase().includes("low")) {
                  newColor = "#f3e072";
                } else if (priority.toLowerCase().includes("half")) {
                  newColor = "#b5f3bf";
                } else {
                  newColor = "#777777";
                }
                newLabel = t(
                  `labels:priority.options.${priority.toLowerCase()}`,
                );
                break;
            }

            if (chartData[division].labels.includes(newLabel)) {
              const index = chartData[division].labels.indexOf(newLabel);
              chartData[division].datasets[0].data[index] +=
                priorityObject["statistics"];
            } else {
              chartData[division].labels.push(newLabel);
              chartData[division].datasets[0].data.push(
                priorityObject["statistics"],
              );
              chartData[division].datasets[0].backgroundColor.push(newColor);
              chartData[division].datasets[0].borderColor.push("#000000");
            }
          }
        }
      }
    }
  }
  return chartData;
}
