import React from "react";

import {
  AccordionTableCell,
  AccordionTableHeader,
  AccordionTableRow,
} from "src/components/common/CustomAccordionTable.tsx";
import {
  costKmFormatter,
  formatter,
  percentFormatter,
} from "src/utils/formatters.ts";

export { BestPerformanceAccordionRow };

interface BestPerformanceAccordionRowProps {
  onClick?: (e: React.MouseEvent<any>) => void | Promise<void>;
  children: React.ReactNode;
  lvl: string;
  title: string;
  data: any;
  supObject: any;
}
function BestPerformanceAccordionRow({
  onClick,
  children,
  lvl,
  title,
  data,
  supObject,
}: BestPerformanceAccordionRowProps) {
  return (
    <>
      <AccordionTableRow onClick={onClick} level={lvl}>
        <AccordionTableHeader level={lvl}>{title}</AccordionTableHeader>
        <AccordionTableCell>
          {`${percentFormatter.format(
            (data.statistics / supObject.statistics) * 100,
          )}%`}
        </AccordionTableCell>
        <AccordionTableCell>
          {formatter.format(data.statistics)}
        </AccordionTableCell>
        <AccordionTableCell>
          {`$${formatter.format(data.cpk)}`}
        </AccordionTableCell>
        <AccordionTableCell>
          {`$${formatter.format(data.potential)}`}
        </AccordionTableCell>
        <AccordionTableCell>
          {`$${costKmFormatter.format(data["km*Real"])}`}
        </AccordionTableCell>
      </AccordionTableRow>
      {children}
    </>
  );
}
