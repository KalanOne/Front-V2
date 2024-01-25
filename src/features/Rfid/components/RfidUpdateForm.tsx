import React from "react";

import { Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";
import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes";

import { RfidUpdateSchemaType } from "../validation/updateRfid";

export { RfidUpdateForm };

interface RfidUpdateFormProps {
  form: UseFormReturn<RfidUpdateSchemaType>;
  subsidiaries: SubsidiaryInputResponse[];
}

function RfidUpdateForm({
  form,
  subsidiaries,
}: RfidUpdateFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"device_code"}
            label={t("labels:device_code")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormSelectInput
            name={"subsidiary_id"}
            label={t("common:subsidiary")}
            disabled={true}
          >
            {subsidiaries.map((subsidiary) => (
              <MenuItem
                key={subsidiary.subsidiary_id}
                value={subsidiary.subsidiary_id}
                disabled={subsidiary.status === 0}
              >
                {subsidiary.name}
              </MenuItem>
            ))}
          </FormSelectInput>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
