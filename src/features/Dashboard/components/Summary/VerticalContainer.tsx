import React from "react";

import { Box } from "@mui/material";

export { VerticalContainer };

interface VerticalContainerProps {
  children: React.ReactNode;
}

function VerticalContainer({
  children,
}: VerticalContainerProps): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {children}
    </Box>
  );
}
