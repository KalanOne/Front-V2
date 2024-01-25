import React from "react";

import { useTranslation } from "react-i18next";

import {
  AccordionTableCell,
  AccordionTableHeader,
  AccordionTableRow,
  TableTitleLvl1,
} from "src/components/common/CustomAccordionTable.tsx";
import { formatter, percentFormatter } from "src/utils/formatters.ts";

export { DynamicCostAccordionRow };

interface DynamicCostAccordionRowProps {
  onClick: (e: React.MouseEvent<any>) => void | Promise<void>;
  children: React.ReactNode;
  lvl: string;
  title: string;
  data: any;
  withTitle?: boolean;
}
function DynamicCostAccordionRow({
  onClick,
  children,
  lvl,
  title,
  data,
  withTitle = false,
}: DynamicCostAccordionRowProps) {
  const { t } = useTranslation();
  return (
    <>
      <AccordionTableRow onClick={onClick} level={lvl}>
        <AccordionTableHeader level={lvl}>{title}</AccordionTableHeader>
        {!withTitle ? (
          <>
            <TableTitleLvl1
              title=""
              value={`${percentFormatter.format(data["percent"])}%`}
            />
            <AccordionTableCell>
              {formatter.format(data["statistics"])}
            </AccordionTableCell>
            <AccordionTableCell>
              {formatter.format(data["cpk"])}
            </AccordionTableCell>
            <AccordionTableCell>
              {`$${formatter.format(data["cpd"])}`}
            </AccordionTableCell>
            <AccordionTableCell>
              {`$${formatter.format(data["km/mm"])}`}
            </AccordionTableCell>
          </>
        ) : (
          <>
            <TableTitleLvl1
              title=""
              value={`${percentFormatter.format(data["percent"])}%`}
            />
            <TableTitleLvl1
              title={t("common:tire", { context: "plural" })}
              value={formatter.format(data["statistics"])}
            />
            <TableTitleLvl1
              title={"Costo KM"}
              value={formatter.format(data["cpk"])}
            />
            <TableTitleLvl1
              title={"Costo MM"}
              value={`${formatter.format(data["cpd"])}`}
            />
            <TableTitleLvl1
              title={"Km/mm"}
              value={`${formatter.format(data["km/mm"])}`}
            />
          </>
        )}
      </AccordionTableRow>
      {children}
    </>
  );
}
