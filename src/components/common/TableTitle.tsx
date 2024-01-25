import React from "react";

import { Box, SxProps, Typography, typographyClasses } from "@mui/material";

export { TableTitle };

interface TableTitleProps {
  title: string;
  sx?: SxProps;
  typoSx?: SxProps;
}

function TableTitle({
  title,
  sx,
  typoSx,
}: TableTitleProps): React.ReactElement {
  return (
    <Box
      sx={[
        {
          backgroundColor: "#002849",
          padding: 1,
          marginTop: 3,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        variant="h4"
        color={"white"}
        textAlign={"center"}
        fontSize={27}
        fontWeight={500}
        sx={typoSx}
      >
        {title}
      </Typography>
    </Box>
  );
}
