import React from "react";

import { useTranslation } from "react-i18next";

import {
  AccordionTableCell,
  AccordionTableHeader,
  AccordionTableRow,
  TableTitleLvl1,
} from "src/components/common/CustomAccordionTable.tsx";
import { formatter, percentFormatter } from "src/utils/formatters.ts";

export { DamageWearAccordionRow };

interface DamageWearAccordionRowProps {
  onClick: (e: React.MouseEvent<any>) => void | Promise<void>;
  children: React.ReactNode;
  lvl: string;
  title: string;
  data: any;
  withTitle?: boolean;
}
function DamageWearAccordionRow({
  onClick,
  children,
  lvl,
  title,
  data,
  withTitle = false,
}: DamageWearAccordionRowProps) {
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
              {`${percentFormatter.format(data["percent"])}%`}
            </AccordionTableCell>
          </>
        ) : (
          <>
            <TableTitleLvl1
              title={"Neumáticos"}
              value={formatter.format(data["statistics"])}
            />
            <TableTitleLvl1
              title="Porcentaje"
              value={`${percentFormatter.format(data["percent"])}%`}
            />
          </>
        )}
      </AccordionTableRow>
      {children}
    </>
  );
}
