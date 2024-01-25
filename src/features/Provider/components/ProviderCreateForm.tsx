import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { subsidiariesFilterProps } from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormTextInput } from "src/components/form/FormTextInput";
import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes";

import { ProviderCreateSchemaType } from "../validation/createProvider";

export { ProviderCreateForm };

interface ProviderCreateFormProps {
  form: UseFormReturn<ProviderCreateSchemaType>;
  subsidiaries: SubsidiaryInputResponse[];
}

function ProviderCreateForm({
  form,
  subsidiaries,
}: ProviderCreateFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"rfc"}
            label={t("labels:rfc")}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput name={"subsidiary_id"} label={"Sucursal"}>
            {subsidiaries.map((subsidiary) => (
              <MenuItem
                key={subsidiary.subsidiary_id}
                value={subsidiary.subsidiary_id}
                disabled={subsidiary.status === 0}
              >
                {subsidiary.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...subsidiariesFilterProps}
            name={"subsidiary_id"}
            options={subsidiaries}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"name"}
            label={t("common:name")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"observation"}
            label={t("labels:observation")}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
