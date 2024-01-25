import React from "react";

import { useTranslation } from "react-i18next";

import {
  AccordionTableCell,
  AccordionTableHeader,
  AccordionTableRow,
  TableTitleLvl1,
} from "src/components/common/CustomAccordionTable.tsx";
import { formatter, percentFormatter } from "src/utils/formatters.ts";

export { KmProjectionAccordionRow };

interface KmProjectionAccordionRowProps {
  onClick: (e: React.MouseEvent<any>) => void | Promise<void>;
  children: React.ReactNode;
  lvl: string;
  title: string;
  data: any;
  withTitle?: boolean;
}
function KmProjectionAccordionRow({
  onClick,
  children,
  lvl,
  title,
  data,
  withTitle = false,
}: KmProjectionAccordionRowProps) {
  const { t } = useTranslation();
  return (
    <>
      <AccordionTableRow onClick={onClick} level={lvl}>
        <AccordionTableHeader level={lvl}>{title}</AccordionTableHeader>
        {!withTitle ? (
          <>
            <AccordionTableCell>
              {formatter.format(data["km/mm"])}
            </AccordionTableCell>
            <AccordionTableCell>
              {formatter.format(data["projection"])}
            </AccordionTableCell>
            <AccordionTableCell>
              {`$${formatter.format(data["cpk"])}`}
            </AccordionTableCell>
          </>
        ) : (
          <>
            <TableTitleLvl1
              title="Km/mm"
              value={formatter.format(data["km/mm"])}
            />

            <TableTitleLvl1
              title={t("features:reportKm.km_projection")}
              value={formatter.format(data["projection"])}
            />
            <TableTitleLvl1
              title={t("features:reportKm.km_projection_cost")}
              value={`$${formatter.format(data["cpk"])}`}
            />
          </>
        )}
      </AccordionTableRow>
      {children}
    </>
  );
}
