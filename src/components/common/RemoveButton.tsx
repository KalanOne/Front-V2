import React from "react";

import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";

export { RemoveButton };

interface RemoveButtonProps {
  onClick?: () => void;
}

function RemoveButton({ onClick }: RemoveButtonProps): React.ReactElement {
  return (
    <IconButton
      sx={{
        backgroundColor: "#536DFE",
        mt: 1,
        "&:hover": {
          backgroundColor: "#3A4CB1",
        },
      }}
      onClick={onClick}
    >
      <RemoveIcon sx={{ color: "white" }} />
    </IconButton>
  );
}
