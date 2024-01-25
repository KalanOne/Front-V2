import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  conditionFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
  locationFilterProps,
  providersFilterProps,
  vehiclesFilterProps,
  warehousesFilterProps,
} from "src/components/filter/formFilterPropsUtils.ts";
// import { useTranslation } from "react-i18next";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import { FormDateInput } from "src/components/form/FormDateInput.tsx";
import { FormTextInput } from "src/components/form/FormTextInput";

import { UseFilterHistoryDependenciesReturns } from "../../hooks/dependenciesFilterHistory";
import { HistoryFilterSchemaType } from "../../validation/filterHistory";

export { HistoryFilterForm };

interface HistoryFilterFormProps {
  form: UseFormReturn<HistoryFilterSchemaType>;
  dependencies: UseFilterHistoryDependenciesReturns;
}

function HistoryFilterForm({
  form,
  dependencies,
}: HistoryFilterFormProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormDateInput {...dateFromFilterProps} name={"dateFrom"} />
        </Grid>
        <Grid item xs={6}>
          <FormDateInput {...dateToFilterProps} name={"dateTo"} />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...providersFilterProps}
            multiple={false}
            options={dependencies.providers ?? []}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...warehousesFilterProps}
            multiple={false}
            options={dependencies.wareHouses ?? []}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...vehiclesFilterProps}
            multiple={false}
            options={dependencies.vehicles ?? []}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...conditionFilterProps}
            name={"tire_condition_id"}
          />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete {...locationFilterProps} name={"movement"} />
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"number_cycle"}
            label={t("labels:number_cycle")}
            inputProps={{ type: "number" }}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
