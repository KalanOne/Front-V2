import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";

import {
  dateFromFilterProps,
  dateToFilterProps,
  reviewTypeFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormDateInput } from "src/components/form/FormDateInput";

import { VehicleReviewMovementFilterSchemaType } from "../validation/filterVehicleReviewMovement";

export { VehicleReviewMovementFilterForm };

interface VehicleReviewMovementFilterFormProps {
  form: UseFormReturn<VehicleReviewMovementFilterSchemaType>;
}

function VehicleReviewMovementFilterForm({
  form,
}: VehicleReviewMovementFilterFormProps): React.ReactElement {
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
            {...reviewTypeFilterProps}
            getOptionDisabled={(option) => option.value === "PARTIAL"}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
