import React from "react";

import { Tab } from "@mui/material";

interface TabsItemProps {
  label?: string;
  href?: string;
  icon?: React.ReactElement;
  iconPosition?: "start" | "end" | "top" | "bottom";
}

function TabsItem(props: TabsItemProps) {
  return <Tab component="a" {...props} />;
}

export default TabsItem;
