import React from "react";

import { Divider, Grid, MenuItem } from "@mui/material";

import {
  FormProvider,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AddButton } from "src/components/common/AddButton";
import { RemoveButton } from "src/components/common/RemoveButton";
import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { SelectedVehiclesSchemaType } from "../validation/selectedVehicles";

export { PressurePolicyCreateMultipleForm };

interface PressurePolicyCreateMultipleFormProps {
  form: UseFormReturn<SelectedVehiclesSchemaType>;
  arrayForm: UseFieldArrayReturn;
}

function PressurePolicyCreateMultipleForm({
  form,
  arrayForm,
}: PressurePolicyCreateMultipleFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {arrayForm.fields.map((field, index) => {
            return (
              <React.Fragment key={field.id}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <FormSelectInput
                      name={`policies.${index}.axle_type`}
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
                  <Grid item xs={4}>
                    <FormTextInput
                      sx={{ width: "100%" }}
                      name={`policies.${index}.recommended_pressure`}
                      label={t(
                        "labels:tire_model_variation.recommended_pressure",
                      )}
                      inputProps={{ type: "number" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormTextInput
                      sx={{ width: "100%" }}
                      name={`policies.${index}.tolerance`}
                      label={t("labels:tire_model_variation.tolerance")}
                      inputProps={{ type: "number" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider light sx={{ fontWeight: "bold", my: 1 }} />
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          })}
          {arrayForm.fields.length - 1 > 0 && (
            <RemoveButton
              onClick={() => arrayForm.remove(arrayForm.fields.length - 1)}
            />
          )}
          <AddButton
            onClick={() =>
              arrayForm.append({
                axle_type: "",
                recommended_pressure: 0,
                tolerance: 0,
              })
            }
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
