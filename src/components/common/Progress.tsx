import React from "react";

import { Box, CircularProgress } from "@mui/material";

export { Progress };

function Progress(): React.ReactElement {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "80px",
        left: "calc(50vw - 20px)",
        zIndex: "9999999",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
