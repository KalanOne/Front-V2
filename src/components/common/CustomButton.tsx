import React from "react";

import { Button, SxProps } from "@mui/material";

export { CustomButton };

interface CustomButtonProps {
  onClick?: () => void;
  text?: string;
  children?: React.ReactNode;
  sx?: SxProps;
  icon?: React.ReactNode;
}

function CustomButton({
  onClick,
  text,
  children,
  sx,
  icon,
}: CustomButtonProps): React.ReactElement {
  return (
    <Button
      sx={[
        {
          alignSelf: "center",
          backgroundColor: "#536DFE",
          border: "none",
          color: "white",
          fontSize: "0.875rem",
          fontWeight: "bold",
          px: 2,
          "&:hover": {
            backgroundColor: "#3A4CB1",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      onClick={onClick}
    >
      {icon}
      {text}
      {children}
    </Button>
  );
}
