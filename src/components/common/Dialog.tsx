import React from "react";

import { Dialog, DialogProps, useMediaQuery, useTheme } from "@mui/material";

export { DialogMediaQuery };

interface DialogMediaQueryProps extends DialogProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * Conditionally renders a Dialog component based on the screen size
 * @param fullScreen If true, the dialog will be full-screen no matter the screen size
 * @param size The screen size the media query will be based on
 * @param props The props of the Dialog component
 */
function DialogMediaQuery({
  fullScreen,
  size,
  ...props
}: DialogMediaQueryProps): React.ReactElement {
  const theme = useTheme();
  const screen = useMediaQuery(theme.breakpoints.down(size || "md"));

  return <Dialog fullScreen={fullScreen ? fullScreen : screen} {...props} />;
}
