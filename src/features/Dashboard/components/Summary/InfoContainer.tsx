import React from "react";

import { Box } from "@mui/material";

export { InfoContainer };

interface InfoContainerProps {
  children: React.ReactNode;
}

function InfoContainer({ children }: InfoContainerProps): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          alignItems: "stretch",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
