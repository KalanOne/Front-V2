import React from "react";

import { FormLabel, Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";

import FormStatus from "src/components/filter/FormStatus.tsx";
import {
  dateFromFilterProps,
  dateToFilterProps,
  subsidiariesFilterProps,
} from "src/components/filter/formFilterPropsUtils.ts";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import { FormDateInput } from "src/components/form/FormDateInput.tsx";
import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes.ts";

import { GpsFilterSchemaType } from "../validation/filterGps.ts";
import { useTranslation } from "react-i18next";

export { GpsFilterForm };

interface GpsFilterFormProps {
  form: UseFormReturn<GpsFilterSchemaType>;
  subsidiaries: SubsidiaryInputResponse[];
}

function GpsFilterForm({
  form,
  subsidiaries,
}: GpsFilterFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormStatus label={t("titles:filter.status.gps")} />
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
        <Grid item xs={12}>
          <FormAutoComplete
            {...subsidiariesFilterProps}
            options={subsidiaries}
            multiple={true}
            name={"subsidiary_id"}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
