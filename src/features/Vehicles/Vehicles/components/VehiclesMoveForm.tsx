import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";

import {
  companiesFilterProps,
  subsidiariesFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";

import { useMoveVehiclesDependencies } from "../hooks/moveVehiclesDependencies";
import { VehiclesMoveSchemaType } from "../validation/moveVehicles";

export { VehiclesMoveForm };

interface VehiclesMoveFormProps {
  form: UseFormReturn<VehiclesMoveSchemaType>;
}

function VehiclesMoveForm({ form }: VehiclesMoveFormProps): React.ReactElement {
  const [company_id] = useWatch({
    control: form.control,
    name: ["company_id"],
  });

  const dependencies = useMoveVehiclesDependencies({ company: company_id });

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormAutoComplete
            {...companiesFilterProps}
            options={dependencies.companies}
            multiple={false}
          />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...subsidiariesFilterProps}
            name="subsidiary_id"
            options={dependencies.subsidiaries}
            multiple={false}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
