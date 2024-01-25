import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";

import {
  brandFilterProps,
  driversFilterProps,
  subsidiariesFilterProps,
  vehicleTypeFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";

import { UseVehicleReviewDependenciesArgsReturn } from "../../VehicleReview/hooks/dependencies";
import { MountingFilterSchemaType } from "../validation/filterMounting";

export { MountingFilterForm };

interface MountingFilterFormProps {
  form: UseFormReturn<MountingFilterSchemaType>;
  dependencies: UseVehicleReviewDependenciesArgsReturn;
}

function MountingFilterForm({
  form,
  dependencies,
}: MountingFilterFormProps): React.ReactElement {
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
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
