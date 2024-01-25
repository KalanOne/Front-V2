import React from "react";

import { FormLabel, Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import FormStatus from "src/components/filter/FormStatus.tsx";
import { FormDateInput } from "src/components/form/FormDateInput.tsx";

import { AlertFilterSchemaType } from "../validation/filterAlert.ts";

export { AlertFilterForm };

interface AlertFilterFormProps {
  form: UseFormReturn<AlertFilterSchemaType>;
}

function AlertFilterForm({ form }: AlertFilterFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormStatus label={t("titles:filter.status.alert")} />
        </Grid>
        <Grid item xs={12}>
          <FormLabel>{t("labels:date.range")}</FormLabel>
        </Grid>
        <Grid item xs={12}>
          <FormDateInput name={"dateFrom"} label={"Desde"} />
        </Grid>
        <Grid item xs={12}>
          <FormDateInput name={"dateTo"} label={"Hasta"} />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
