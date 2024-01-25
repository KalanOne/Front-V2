import React from "react";

import { useTranslation } from "react-i18next";

import {
  AccordionTableCell,
  AccordionTableHeader,
  AccordionTableRow,
} from "src/components/common/CustomAccordionTable.tsx";
import { formatter, percentFormatter } from "src/utils/formatters.ts";

export { SummaryAccordionRow };

interface SummaryAccordionRowProps {
  onClick?: (e: React.MouseEvent<any>) => void | Promise<void>;
  children: React.ReactNode;
  lvl: string;
  title: string;
  data: any;
}
function SummaryAccordionRow({
  onClick,
  children,
  lvl,
  title,
  data,
}: SummaryAccordionRowProps) {
  let newTitle = title;
  const { t } = useTranslation();
  if (lvl == "6") {
    newTitle = t(`labels:tire_application.options.${title.toLowerCase()}`);
  }
  return (
    <>
      <AccordionTableRow onClick={onClick} level={lvl}>
        <AccordionTableHeader level={lvl}>{newTitle}</AccordionTableHeader>
        <AccordionTableCell>
          {formatter.format(data.statistics)}
        </AccordionTableCell>
        <AccordionTableCell>
          {`${percentFormatter.format(data.percent)}`}
        </AccordionTableCell>
      </AccordionTableRow>
      {children}
    </>
  );
}
