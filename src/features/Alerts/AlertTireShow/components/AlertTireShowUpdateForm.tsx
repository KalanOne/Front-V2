import React from "react";

import { Grid, Typography } from "@mui/material";

import * as dayjs from "dayjs";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormTextInput } from "src/components/form/FormTextInput.tsx";

import { AlertTireShowResponse } from "../types/alertTireShowTypes.ts";
import { AlertTireShowUpdateSchemaType } from "../validation/updateAlertTireShow.ts";

export { AlertTireShowUpdateForm };

interface AlertTireShowUpdateFormProps {
  form: UseFormReturn<AlertTireShowUpdateSchemaType>;
  alertTireShow?: AlertTireShowResponse;
}

function AlertTireShowUpdateForm({
  form,
  alertTireShow,
}: AlertTireShowUpdateFormProps): React.ReactElement {
  const { t } = useTranslation();

  const priority = (alertTireShow: AlertTireShowResponse): string => {
    switch (alertTireShow.alert.priority) {
      case "HIGH":
        return t("labels:priority.options.high");
      case "HALF":
        return t("labels:priority.options.half");
      case "LOW":
        return t("labels:priority.options.low");
      default:
        return alertTireShow.alert.priority;
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
            {alertTireShow && alertTireShow.alert.code}
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
            {alertTireShow && priority(alertTireShow)}
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
            {alertTireShow && dayjs(alertTireShow.created_at).format("LLL")}
          </Typography>
        </Grid>
        <Grid item xs={12} mb={3}>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", color: "rgba(0, 0, 0, 0.54);" }}
          >
            {t("labels:alert.details")}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            {alertTireShow &&
              t(`alerts:details.${alertTireShow.alert.details}`)}
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
