import React from "react";

import { Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { PressurePolicyCreateSchemaType } from "../validation/createPressurePolicy";

export { PressurePolicyCreateForm };

interface PressurePolicyCreateFormProps {
  form: UseFormReturn<PressurePolicyCreateSchemaType>;
}

function PressurePolicyCreateForm({
  form,
}: PressurePolicyCreateFormProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"economic_number"}
            label={t("labels:economic_number")}
            disabled={true}
          />
        </Grid>
        <Grid item xs={6}>
          <FormSelectInput
            name="axle_type"
            label={t("labels:tire_application.label.singular")}
          >
            <MenuItem value="DIRECTIONAL">
              {t("labels:tire_application.options.directional")}
            </MenuItem>
            <MenuItem value="TRACTION">
              {t("labels:tire_application.options.traction")}
            </MenuItem>
            <MenuItem value="TRAILER">
              {t("labels:tire_application.options.trailer")}
            </MenuItem>
            <MenuItem value="REFECTION">{"Refaccion"}</MenuItem>
          </FormSelectInput>
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"recommended_pressure"}
            label={t("labels:tire_model_variation.recommended_pressure")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"tolerance"}
            label={t("labels:tire_model_variation.tolerance")}
            inputProps={{ type: "number" }}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
