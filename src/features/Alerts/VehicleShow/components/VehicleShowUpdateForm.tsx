import React from "react";

import { Grid, Typography } from "@mui/material";

import * as dayjs from "dayjs";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormTextInput } from "src/components/form/FormTextInput.tsx";
import { VehicleShowResponse } from "src/features/Alerts/VehicleShow/types/vehicleShowTypes.ts";

import { AlertTireShowUpdateSchemaType } from "../../AlertTireShow/validation/updateAlertTireShow";

export { VehicleShowUpdateForm };

interface VehicleShowUpdateFormProps {
  form: UseFormReturn<AlertTireShowUpdateSchemaType>;
  vehicleShow?: VehicleShowResponse;
}

function VehicleShowUpdateForm({
  form,
  vehicleShow,
}: VehicleShowUpdateFormProps): React.ReactElement {
  const { t } = useTranslation();

  const priority = (vehicleShow: VehicleShowResponse): string => {
    switch (vehicleShow.alert.priority) {
      case "HIGH":
        return t("labels:priority.options.high");
      case "HALF":
        return t("labels:priority.options.half");
      case "LOW":
        return t("labels:priority.options.low");
      default:
        return vehicleShow.alert.priority;
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
            {vehicleShow && vehicleShow.alert.code}
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
            {vehicleShow && priority(vehicleShow)}
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
            {vehicleShow && dayjs(vehicleShow.alert.created_at).format("LLL")}
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
            {vehicleShow && t(`alerts:details.${vehicleShow.alert.details}`)}
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
