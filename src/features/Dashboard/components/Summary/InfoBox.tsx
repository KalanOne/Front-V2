import React from "react";

import { Box, SxProps, Theme } from "@mui/material";

export { InfoBox };

interface InfoBoxProps {
  children: React.ReactNode;
  color: string;
  direction?: "row" | "column";
  sx?: SxProps<Theme>;
}

function InfoBox({
  children,
  color,
  sx,
  direction = "row",
}: InfoBoxProps): React.ReactElement {
  return (
    <Box
      sx={[
        {
          padding: "1rem",
          borderRadius: "0.5rem",
          color: "white",
          fontWeight: "bold",
          fontSize: "1.25rem",
          width: "150px",
          display: "flex",
          height: "70px",
          backgroundColor: color,
        },
        direction === "row"
          ? {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }
          : {
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
