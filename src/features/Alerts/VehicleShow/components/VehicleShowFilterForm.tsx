import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";

// import { useTranslation } from "react-i18next";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import {
  alertClasificationFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
} from "src/components/filter/formFilterPropsUtils.ts";
import { FormDateInput } from "src/components/form/FormDateInput.tsx";

import { VehicleShowFilterSchemaType } from "../validation/filterVehicleShow.ts";

export { VehicleShowFilterForm };

interface VehicleShowFilterFormProps {
  form: UseFormReturn<VehicleShowFilterSchemaType>;
}

function VehicleShowFilterForm({
  form,
}: VehicleShowFilterFormProps): React.ReactElement {

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormDateInput {...dateFromFilterProps} />
        </Grid>
        <Grid item xs={6}>
          <FormDateInput {...dateToFilterProps} />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete {...alertClasificationFilterProps} />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
