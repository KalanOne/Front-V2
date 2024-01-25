import React, { useState } from "react";

export { AccordionTable };

interface AccordionTableProps {
  children: React.ReactNode;
  render: (
    children: React.ReactNode,
    onClick?: (e: React.MouseEvent<any>) => void | Promise<void>,
  ) => React.ReactNode;
  onClick?: (e: React.MouseEvent<any>) => void | Promise<void>;
}

function AccordionTable({
  children,
  render,
  onClick,
}: AccordionTableProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  async function handleClick(e: React.MouseEvent<any>) {
    e.stopPropagation();
    setOpen(!open);
    if (onClick) {
      await onClick(e);
    }
  }

  return <>{render(open ? children : <></>, handleClick)}</>;
}
