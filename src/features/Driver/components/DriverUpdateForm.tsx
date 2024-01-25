import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { subsidiariesFilterProps } from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormTextInput } from "src/components/form/FormTextInput";
import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes";

import { DriverUpdateSchemaType } from "../validation/updateDriver";

export { DriverUpdateForm };

interface DriverUpdateFormProps {
  form: UseFormReturn<DriverUpdateSchemaType>;
  subsidiaries: SubsidiaryInputResponse[];
}

function DriverUpdateForm({
  form,
  subsidiaries,
}: DriverUpdateFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"name"}
            label={t("labels:name.special")}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput
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
          </FormSelectInput> */}
          <FormAutoComplete
            {...subsidiariesFilterProps}
            name={"subsidiary_id"}
            options={subsidiaries}
            getOptionDisabled={(option) => option.status === 0}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
