import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";

import FormStatus from "src/components/filter/FormStatus.tsx";
import { associationFilterProps } from "src/components/filter/formFilterPropsUtils.ts";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";

import { AssociationResponse } from "../types/commissionedDriverTypes.ts";
import { CommissionedDriverFilterSchemaType } from "../validation/filterCommissionedDriver.ts";

export { CommissionedDriverFilterForm };

interface CommissionedDriverFilterFormProps {
  form: UseFormReturn<CommissionedDriverFilterSchemaType>;
  associations: AssociationResponse[];
}

function CommissionedDriverFilterForm({
  form,
  associations,
}: CommissionedDriverFilterFormProps): React.ReactElement {
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormStatus label={"ESTATUS"} />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...associationFilterProps}
            options={associations}
            multiple={false}
            name={"association_id"}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
