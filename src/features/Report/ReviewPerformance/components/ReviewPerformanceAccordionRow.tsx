import React from "react";

import { useTranslation } from "react-i18next";

import {
  AccordionTableCell,
  AccordionTableHeader,
  AccordionTableRow,
  TableTitleLvl1,
} from "src/components/common/CustomAccordionTable.tsx";
import { formatter, percentFormatter } from "src/utils/formatters.ts";

export { ReviewPerformanceAccordionRow };

interface ReviewPerformanceAccordionRowProps {
  onClick: (e: React.MouseEvent<any>) => void | Promise<void>;
  children: React.ReactNode;
  lvl: string;
  title: string;
  data: any;
  withTitle?: boolean;
}
function ReviewPerformanceAccordionRow({
  onClick,
  children,
  lvl,
  title,
  data,
  withTitle = false,
}: ReviewPerformanceAccordionRowProps) {
  const { t } = useTranslation();
  return (
    <>
      <AccordionTableRow onClick={onClick} level={lvl}>
        <AccordionTableHeader level={lvl}>{title}</AccordionTableHeader>
        {!withTitle ? (
          <>
            <AccordionTableCell>
              {formatter.format(data["statistics"])}
            </AccordionTableCell>
            <AccordionTableCell>
              {percentFormatter.format(data["percent"]) + "%"}
            </AccordionTableCell>
          </>
        ) : (
          <>
            <TableTitleLvl1
              title="Revisiones"
              value={formatter.format(data["statistics"])}
            />
            <TableTitleLvl1
              title="Porcentaje"
              value={percentFormatter.format(data["percent"]) + "%"}
            />
          </>
        )}
      </AccordionTableRow>
      {children}
    </>
  );
}
