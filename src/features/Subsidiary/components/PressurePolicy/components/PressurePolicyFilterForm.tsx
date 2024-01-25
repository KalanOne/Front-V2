import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";

import {
  axleTypeFilterProps,
  vehicleTypeFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";

import { UseVehicleTypeDependenciesReturns } from "../hooks/dependenciesVehicleType";
import { PressurePolicyFilterSchemaType } from "../validation/filterPressurePolicy";

interface PressurePolicyFilterFormProps {
  form: UseFormReturn<PressurePolicyFilterSchemaType>;
  dependencies: UseVehicleTypeDependenciesReturns;
}

function PressurePolicyFilterForm({
  form,
  dependencies,
}: PressurePolicyFilterFormProps): React.ReactElement {
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* <FormFilterSelectInput
            {...vehicleTypeFilterProps}
            items={dependencies.vehicleType}
            multiple={true}
            name={"vehicle_type"}
          /> */}
          <FormAutoComplete
            {...vehicleTypeFilterProps}
            options={dependencies.vehicleType}
            multiple={true}
            name={"vehicle_type"}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <FormFilterSelectInput {...axleTypeFilterProps} name={"axle_type"} /> */}
          <FormAutoComplete {...axleTypeFilterProps} name={"axle_type"} />
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default PressurePolicyFilterForm;
