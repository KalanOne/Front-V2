import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";

import {
  brandFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
  driversFilterProps,
  subsidiariesFilterProps,
  vehicleTypeFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import { FormDateInput } from "src/components/form/FormDateInput";

import { UseVehicleReviewDependenciesArgsReturn } from "../hooks/dependencies";
import { VehicleReviewFilterSchemaType } from "../validation/filterVehicleReview";

export { VehicleReviewFilterForm };

interface VehicleReviewFilterFormProps {
  form: UseFormReturn<VehicleReviewFilterSchemaType>;
  dependencies: UseVehicleReviewDependenciesArgsReturn;
}

function VehicleReviewFilterForm({
  form,
  dependencies,
}: VehicleReviewFilterFormProps): React.ReactElement {
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
          <FormAutoComplete
            {...subsidiariesFilterProps}
            options={dependencies.subsidiaries}
          />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...vehicleTypeFilterProps}
            options={dependencies.vehicleTypes}
            multiple={false}
          />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...brandFilterProps}
            name="vehicle_brand_id"
            options={dependencies.brands}
            multiple={false}
          />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...driversFilterProps}
            name="drivers"
            options={dependencies.drivers}
            multiple={false}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
