import React from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button } from "@mui/material";

export { ButtonReview };

interface ButtonReviewProps {
  tireObject: any;
  onClick: (tireObject: any) => void;
}

function ButtonReview({
  tireObject,
  onClick,
}: ButtonReviewProps): React.ReactElement {
  return (
    <Box component={"td"}>
      <Button
        onClick={() => onClick(tireObject)}
        sx={{
          color: "white",
          backgroundColor: "#44627a",
          borderRadius: "12px",
          border: "2px solid rgb(92, 147, 153)",
          padding: "3px 8px",
          fontSize: "0.82rem;",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none",
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "#4181af",
            borderColor: "rgb(100, 155, 161)",
          },
          marginLeft: "10px",
        }}
      >
        <VisibilityIcon sx={{ color: "white" }} />
        <Box component={"p"} sx={{ color: "white", paddingLeft: "5px" }}>
          {tireObject["code"]}
        </Box>
      </Button>
    </Box>
  );
}
