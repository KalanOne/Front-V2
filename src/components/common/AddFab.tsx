import React from "react";

import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";

export { AddFab };

interface AddFabProps {
  onClick?: () => void;
}

function AddFab({ onClick }: AddFabProps): React.ReactElement {
  return (
    <Fab
      onClick={onClick}
      color="primary"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: "2.5rem",
        right: "2.5rem",
      }}
    >
      <AddIcon />
    </Fab>
  );
}
