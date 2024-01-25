import React from "react";

import { FormLabel, Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import FormApproved from "src/components/filter/FormApproved.tsx";
import FormStatus from "src/components/filter/FormStatus.tsx";
import {
  dateFromFilterProps,
  dateToFilterProps,
} from "src/components/filter/formFilterPropsUtils.ts";
import { FormDateInput } from "src/components/form/FormDateInput.tsx";

import { SizeFilterSchemaType } from "../validation/filterSize.ts";

export { SizeFilterForm };

interface SizeFilterFormProps {
  form: UseFormReturn<SizeFilterSchemaType>;
}

function SizeFilterForm({ form }: SizeFilterFormProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormStatus label={t("titles:filter.status.size")} />
        </Grid>
        <Grid item xs={12}>
          <FormApproved label={t("general:approval_status")} />
        </Grid>
        <Grid item xs={12}>
          <FormLabel>{t("labels:date.range")}</FormLabel>
        </Grid>
        <Grid item xs={12}>
          <FormDateInput {...dateFromFilterProps} name={"dateFrom"} />
        </Grid>
        <Grid item xs={12}>
          <FormDateInput {...dateToFilterProps} name={"dateTo"} />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
