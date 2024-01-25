import { Typography } from "@mui/material";

export { LabelAndText };

interface LabelAndTextProps {
  label: string;
  text: string;
}

function LabelAndText({ label, text }: LabelAndTextProps): React.ReactElement {
  return (
    <>
      <Typography variant="caption" color="textSecondary" display="block">
        {label}
      </Typography>
      <Typography variant="body1">{text}</Typography>
    </>
  );
}
