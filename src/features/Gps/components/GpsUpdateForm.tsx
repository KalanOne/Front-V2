import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { subsidiariesFilterProps } from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormTextInput } from "src/components/form/FormTextInput";
import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes";

import { GpsUpdateSchemaType } from "../validation/updateGps";

export { GpsUpdateForm };

interface GpsUpdateFormProps {
  form: UseFormReturn<GpsUpdateSchemaType>;
  subsidiaries: SubsidiaryInputResponse[];
}

function GpsUpdateForm({
  form,
  subsidiaries,
}: GpsUpdateFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"imei"}
            label={t("labels:imei")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"device_name"}
            label={t("labels:device_name")}
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
            disabled={true}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
