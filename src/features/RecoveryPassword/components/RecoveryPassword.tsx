import { Paper, Stack, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import setenalBackgroundImage from "../../Login/assets/images/setenalBackground.jpg";
import { RecoveryPasswordForm } from "./RecoveryPasswordForm";

export { RecoveryPassword };

function RecoveryPassword(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{ width: "100%", height: "100%" }}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          width: "50%",
          height: "100%",
          backgroundImage: `linear-gradient(rgba(2, 136, 210, 0.5), rgba(2, 136, 210, 0.5)), url(${setenalBackgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        <Typography variant={"h4"} sx={{ color: "white" }}>
          SIAN
        </Typography>
      </Stack>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ width: "50%" }}
      >
        <Paper sx={{ p: 4, width: "400px" }}>
          <Typography variant={"h5"}>
            {t("features:recoveryPassword.title")}
          </Typography>
          <Typography variant={"body2"} sx={{ color: "text.secondary" }}>
            {t("features:recoveryPassword.sub_title")}
          </Typography>
          <RecoveryPasswordForm />
        </Paper>
      </Stack>
    </Stack>
  );
}
