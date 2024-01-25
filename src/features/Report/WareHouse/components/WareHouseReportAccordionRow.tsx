import React from "react";

import { useTranslation } from "react-i18next";

import {
  AccordionTableCell,
  AccordionTableHeader,
  AccordionTableRow,
  TableTitleLvl1,
} from "src/components/common/CustomAccordionTable.tsx";
import { formatter, percentFormatter } from "src/utils/formatters.ts";

export { WareHouseReportAccordionRow };

interface WareHouseReportAccordionRowProps {
  onClick: (e: React.MouseEvent<any>) => void | Promise<void>;
  children: React.ReactNode;
  lvl: string;
  title: string;
  data: any;
  withTitle?: boolean;
}
function WareHouseReportAccordionRow({
  onClick,
  children,
  lvl,
  title,
  data,
  withTitle = false,
}: WareHouseReportAccordionRowProps) {
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
              title={t("common:tire", { context: "plural" })}
              value={formatter.format(data["statistics"])}
              isDark={true}
            />
            <TableTitleLvl1
              title="Porcentaje"
              value={percentFormatter.format(data["percent"]) + "%"}
              isDark={true}
            />
          </>
        )}
      </AccordionTableRow>
      {children}
    </>
  );
}
