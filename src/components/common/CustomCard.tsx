import { CardHeader, styled } from "@mui/material";

export { CardHeaderGradient };

const CardHeaderGradient = styled(CardHeader)({
  background: "linear-gradient(130deg,#2d68ff,#18223b)",
  color: "white",
  textAlign: "center",
  "& span": {
    fontSize: "0.95rem",
  },
});
