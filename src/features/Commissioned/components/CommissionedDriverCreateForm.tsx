import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { associationFilterProps } from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormTextInput } from "src/components/form/FormTextInput";

import { AssociationResponse } from "../types/commissionedDriverTypes";
import { CommissionedDriverCreateSchemaType } from "../validation/createCommissionedDriver";

export { CommissionedDriverCreateForm };

interface CommissionedDriverCreateFormProps {
  form: UseFormReturn<CommissionedDriverCreateSchemaType>;
  associations: AssociationResponse[];
}

function CommissionedDriverCreateForm({
  form,
  associations,
}: CommissionedDriverCreateFormProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"name"}
            label={t("common:name")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"driver_code"}
            label={"Clave"}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput name={"association_id"} label={"Transportista"}>
            {associations.map((association) => (
              <MenuItem
                key={association.association_id}
                value={association.association_id}
                disabled={association.status === 0}
              >
                {association.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...associationFilterProps}
            name={"association_id"}
            options={associations}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
