import React from "react";

import { Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { AssociationResponse } from "../types/commissionedDriverTypes";
import { CommissionedDriverUpdateSchemaType } from "../validation/updateCommissionedDriver";

export { CommissionedDriverUpdateForm };

interface CommissionedDriverUpdateFormProps {
  form: UseFormReturn<CommissionedDriverUpdateSchemaType>;
  associations: AssociationResponse[];
}

function CommissionedDriverUpdateForm({
  form,
  associations,
}: CommissionedDriverUpdateFormProps): React.ReactElement {
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
          <FormSelectInput
            name={"association_id"}
            label={"Transportista"}
            disabled={true}
          >
            {associations.map((association) => (
              <MenuItem
                key={association.association_id}
                value={association.association_id}
                disabled={association.status === 0}
              >
                {association.name}
              </MenuItem>
            ))}
          </FormSelectInput>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
