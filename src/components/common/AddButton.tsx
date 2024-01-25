import React from "react";

import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

export { AddButton };

interface AddButtonProps {
  onClick?: () => void;
}

function AddButton({ onClick }: AddButtonProps): React.ReactElement {
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
      <AddIcon sx={{ color: "white" }} />
    </IconButton>
  );
}
