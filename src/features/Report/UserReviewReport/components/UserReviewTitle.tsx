import { Container, Divider, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

export { UserReviewTitle };

function UserReviewTitle() {
  const { t } = useTranslation();
  return (
    <Container sx={{ p: 3 }} maxWidth={"xl"}>
      <Divider />
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mt: 3, fontWeight: "500" }}
      >
        {t("features:reportUserReview.review_report")}
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
        {t("features:reportUserReview.report_show")}
      </Typography>
      <Typography
        component={"p"}
        textAlign={"center"}
        color={"lightcoral"}
        fontSize={14}
        mb={3}
      >
        {t("labels:location.label")}: {t("labels:location.options.mount")}
      </Typography>
      <Divider />
    </Container>
  );
}
