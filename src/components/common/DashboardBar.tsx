import React from "react";

import { Box, SxProps, Theme } from "@mui/material";

export { DashboardBar };

interface DashboardBarProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

function DashboardBar({ children, sx }: DashboardBarProps) {
  return (
    <Box
      sx={[
        {
          backgroundColor: "#343a40",
          width: "100%",
          display: "flex",
          gap: "0.5rem",
          padding: "0.25rem",
          borderRadius: "0.25rem",
          overflowX: "auto",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
