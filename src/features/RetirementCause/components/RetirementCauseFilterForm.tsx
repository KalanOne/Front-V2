import React from "react";

import { FormLabel, Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import FormStatus from "src/components/filter/FormStatus.tsx";
import {
  dateFromFilterProps,
  dateToFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormDateInput } from "src/components/form/FormDateInput.tsx";

import { CauseFilterSchemaType } from "../validation/filterRetirementCause";

export { RetirementCauseFilterForm };

interface RetirementCauseFilterFormProps {
  form: UseFormReturn<CauseFilterSchemaType>;
}

function RetirementCauseFilterForm({
  form,
}: RetirementCauseFilterFormProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormStatus label={t("titles:filter.status.retirement_cause")} />
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
