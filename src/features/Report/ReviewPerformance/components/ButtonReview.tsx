import React from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button } from "@mui/material";

import { useTranslation } from "react-i18next";

export { ButtonReview };

interface ButtonReviewProps {
  reviewObject: any;
  onClick: (reviewObject: any) => void;
}

function ButtonReview({
  reviewObject,
  onClick,
}: ButtonReviewProps): React.ReactElement {
  const { t } = useTranslation();
  function formatFecha(fecha: string) {
    const fechaOriginal = new Date(fecha);
    const fechaFormateada = fechaOriginal.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return fechaFormateada;
  }
  return (
    <Box component={"td"}>
      <Button
        onClick={() => onClick(reviewObject)}
        sx={{
          color: "white",
          backgroundColor: "#44627a",
          borderRadius: "12px",
          border: "2px solid rgb(92, 147, 153)",
          padding: "1px 10px",
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
          {reviewObject["economic_number"]}
        </Box>
      </Button>
    </Box>
  );
}
