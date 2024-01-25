import React from "react";

import { Box } from "@mui/material";

import { useTranslation } from "react-i18next";

import {
  AccordionTableCell,
  AccordionTableHeader,
  AccordionTableRow,
} from "src/components/common/CustomAccordionTable.tsx";
import { formatter, percentFormatter } from "src/utils/formatters.ts";

export { SummaryPriorityAccordionRow };

interface SummaryPriorityAccordionRowProps {
  onClick?: (e: React.MouseEvent<any>) => void | Promise<void>;
  children: React.ReactNode;
  title: string;
  data: any;
  type: "pressure" | "depth" | "alert";
}
function SummaryPriorityAccordionRow({
  onClick,
  children,
  title,
  data,
  type,
}: SummaryPriorityAccordionRowProps) {
  const { t } = useTranslation();
  let level = "";
  let newTitle = title.toLowerCase();
  // t("labels2:summary_report.percent")

  switch (type) {
    case "pressure":
      if (newTitle.includes("high")) {
        level = "CRITICAL";
      } else if (newTitle.includes("low")) {
        level = "SCHEDULED";
      } else if (newTitle.includes("normal")) {
        level = "GOOD";
      } else {
        level = "OTHER";
      }
      newTitle = t(
        `labels2:summary_report.pressure_condition.${newTitle.replace(
          " ",
          "_",
        )}`,
      );
      break;
    case "depth":
      if (newTitle.includes("critical")) {
        level = "CRITICAL";
      } else if (newTitle.includes("scheduled")) {
        level = "SCHEDULED";
      } else if (newTitle.includes("good")) {
        level = "GOOD";
      } else {
        level = "OTHER";
      }
      newTitle = t(
        `labels2:summary_report.depth_condition.${newTitle.replace(" ", "_")}`,
      );
      break;
    case "alert":
      if (newTitle.includes("high")) {
        level = "CRITICAL";
      } else if (newTitle.includes("low")) {
        level = "SCHEDULED";
      } else if (newTitle.includes("half")) {
        level = "GOOD";
      } else {
        level = "OTHER";
      }
      newTitle = t(`labels:priority.options.${newTitle}`);
      break;
  }

  return (
    <>
      <AccordionTableRow onClick={onClick} level={level}>
        <AccordionTableHeader
          level={level}
          sx={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              backgroundColor:
                level === "GOOD"
                  ? "#006633"
                  : level === "SCHEDULED"
                  ? "#ffbf00"
                  : level === "CRITICAL"
                  ? "#ff4d4d"
                  : "white",
            }}
          ></Box>
          {newTitle}
        </AccordionTableHeader>
        <AccordionTableCell sx={{ color: level !== "OTHER" ? "black" : null }}>
          {formatter.format(data.statistics)}
        </AccordionTableCell>
        <AccordionTableCell sx={{ color: level !== "OTHER" ? "black" : null }}>
          {`${percentFormatter.format(data.percent)}`}
        </AccordionTableCell>
      </AccordionTableRow>
      {children}
    </>
  );
}
