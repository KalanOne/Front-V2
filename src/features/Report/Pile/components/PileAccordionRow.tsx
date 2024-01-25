import React from "react";

import {
  AccordionTableCell,
  AccordionTableHeader,
  AccordionTableRow,
} from "src/components/common/CustomAccordionTable.tsx";
import { formatter, percentFormatter } from "src/utils/formatters.ts";

export { PileAccordionRow };

interface PileAccordionRowProps {
  onClick?: (e: React.MouseEvent<any>) => void | Promise<void>;
  children: React.ReactNode;
  lvl: string;
  title: string;
  data: any;
}
function PileAccordionRow({
  onClick,
  children,
  lvl,
  title,
  data,
}: PileAccordionRowProps) {
  // console.log("data", data);
  return (
    <>
      <AccordionTableRow onClick={onClick} level={lvl}>
        <AccordionTableHeader level={lvl}>{title}</AccordionTableHeader>
        <AccordionTableCell>
          {formatter.format(data.statistics)}
        </AccordionTableCell>
        <AccordionTableCell>
          {`${percentFormatter.format(data.depth_average)}`}
        </AccordionTableCell>
        <AccordionTableCell>
          {`${percentFormatter.format(data.remainder_depth)}`}
        </AccordionTableCell>
        <AccordionTableCell>
          {`$${percentFormatter.format(data.cpd)}`}
        </AccordionTableCell>
        <AccordionTableCell>
          {`$${percentFormatter.format(data.average_cost_utils_mm)}`}
        </AccordionTableCell>
        <AccordionTableCell>
          {`$${percentFormatter.format(data.depth_average)}`}
        </AccordionTableCell>
      </AccordionTableRow>
      {children}
    </>
  );
}
