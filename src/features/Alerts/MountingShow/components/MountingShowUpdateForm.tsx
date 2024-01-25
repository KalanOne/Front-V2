import React from "react";

import { Grid, Typography } from "@mui/material";

import * as dayjs from "dayjs";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormTextInput } from "src/components/form/FormTextInput.tsx";

import { MountingShowResponse } from "../types/mountingShowTypes";
import { MountingShowUpdateSchemaType } from "../validation/updateMountingShow";

export { MountingShowUpdateForm };

interface MountingShowUpdateFormProps {
  form: UseFormReturn<MountingShowUpdateSchemaType>;
  mountingShow?: MountingShowResponse;
}

function MountingShowUpdateForm({
  form,
  mountingShow,
}: MountingShowUpdateFormProps): React.ReactElement {
  const { t } = useTranslation();

  const priority = (mountingShow: MountingShowResponse): string => {
    switch (mountingShow.alert.priority) {
      case "HIGH":
        return t("labels:priority.options.high");
      case "HALF":
        return t("labels:priority.options.half");
      case "LOW":
        return t("labels:priority.options.low");
      default:
        return mountingShow.alert.priority;
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={true}>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", color: "rgba(0, 0, 0, 0.54);" }}
          >
            {t("labels:alert.code")}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            {mountingShow && mountingShow.alert.code}
          </Typography>
        </Grid>
        <Grid item xs={true}>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", color: "rgba(0, 0, 0, 0.54);" }}
          >
            {t("labels:priority.label")}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            {mountingShow && priority(mountingShow)}
          </Typography>
        </Grid>
        <Grid item xs={true}>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", color: "rgba(0, 0, 0, 0.54);" }}
          >
            {t("labels:date.label")}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            {mountingShow && dayjs(mountingShow.alert.created_at).format("LLL")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", color: "rgba(0, 0, 0, 0.54);" }}
          >
            {t("labels:alert.details")}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            {mountingShow && t(`alerts:details.${mountingShow.alert.details}`)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", color: "rgba(0, 0, 0, 0.54);" }}
          >
            {t("common:cause")}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            {mountingShow && mountingShow.alert_cause}
          </Typography>
        </Grid>
        <Grid item xs={true} mb={3}>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", color: "rgba(0, 0, 0, 0.54);" }}
          >
            {t("common:review")}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1rem" }}></Typography>
        </Grid>
        <Grid item xs={true} mb={3}>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", color: "rgba(0, 0, 0, 0.54);" }}
          >
            {t("labels:pressure")}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            {mountingShow && mountingShow.alert.code}
          </Typography>
        </Grid>
        <Grid item xs={true} mb={3}>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", color: "rgba(0, 0, 0, 0.54);" }}
          >
            {t("labels:depth")}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            {mountingShow && mountingShow.alert.code}
          </Typography>
        </Grid>
      </Grid>

      <FormProvider {...form}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormTextInput
              sx={{ width: "100%" }}
              name={"comment"}
              label={t("common:comment")}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
