import React from "react";

import { TableRow } from "@mui/material";

import { TableBodyCell } from "../common/CustomTable";

export { AccordionElement };

interface AccordionElementProps {
  text: string;
  onClick?: (e: React.MouseEvent<any>) => void | Promise<void>;
  children?: React.ReactNode;
}

function AccordionElement({
  text,
  onClick,
  children,
}: AccordionElementProps): React.ReactElement {
  return (
    <>
      <TableRow onClick={onClick}>
        <TableBodyCell>{text}</TableBodyCell>
      </TableRow>
      {children}
    </>
  );
}
