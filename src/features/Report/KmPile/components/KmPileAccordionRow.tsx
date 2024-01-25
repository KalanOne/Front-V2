import React from "react";

import {
  AccordionTableCell,
  AccordionTableHeader,
  AccordionTableRow,
} from "src/components/common/CustomAccordionTable.tsx";
import { formatter, percentFormatter } from "src/utils/formatters.ts";

export { KmPileAccordionRow };

interface KmPileAccordionRowProps {
  onClick?: (e: React.MouseEvent<any>) => void | Promise<void>;
  children: React.ReactNode;
  lvl: string;
  title: string;
  data: any;
}
function KmPileAccordionRow({
  onClick,
  children,
  lvl,
  title,
  data,
}: KmPileAccordionRowProps) {
  // console.log("data", data);
  return (
    <>
      <AccordionTableRow onClick={onClick} level={lvl}>
        <AccordionTableHeader level={lvl}>{title}</AccordionTableHeader>
        <AccordionTableCell>
          {formatter.format(data.statistics)}
        </AccordionTableCell>
        <AccordionTableCell>
          {`${percentFormatter.format(data.travel_average)}`}
        </AccordionTableCell>
        <AccordionTableCell>
          {`${percentFormatter.format(data.travel_summary)}`}
        </AccordionTableCell>
        <AccordionTableCell>
          {`$${percentFormatter.format(data.cpk)}`}
        </AccordionTableCell>
      </AccordionTableRow>
      {children}
    </>
  );
}
