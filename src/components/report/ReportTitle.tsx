import { Container, Divider, Typography } from "@mui/material";

export { ReportTitle };

interface ReportTitleProps {
  title?: string;
  subtitleDark?: string;
  subtitleRed1?: string;
  subtitleRed2?: string;
}

function ReportTitle({
  title,
  subtitleDark,
  subtitleRed1,
  subtitleRed2,
}: ReportTitleProps) {
  // if (!title && !subtitleDark && !subtitleRed1 && !subtitleRed2) {
  //   return <></>;
  // }

  return (
    <Container sx={{ p: 3 }} maxWidth={"xl"}>
      <Divider sx={{ marginBottom: 2 }} />
      {title && (
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mt: 3, fontWeight: "500" }}
        >
          {title}
        </Typography>
      )}
      {subtitleDark && (
        <Typography
          variant="h5"
          gutterBottom
          sx={[{ textAlign: "center" }, !title && { mt: 3 }]}
        >
          {subtitleDark}
        </Typography>
      )}
      {subtitleRed1 && (
        <Typography
          component={"p"}
          textAlign={"center"}
          color={"lightcoral"}
          fontSize={14}
        >
          {subtitleRed1}
        </Typography>
      )}
      {subtitleRed2 && (
        <Typography
          component={"p"}
          textAlign={"center"}
          color={"lightcoral"}
          fontSize={14}
        >
          {subtitleRed2}
        </Typography>
      )}
      <Divider sx={{ mt: 3 }} />
    </Container>
  );
}
