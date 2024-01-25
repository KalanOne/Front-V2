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
import { SelectedVehiclesDepthSchemaType } from "../validation/selectedVehiclesDepth";

export { DepthPolicyCreateMultipleForm };

interface DepthPolicyCreateMultipleFormProps {
  form: UseFormReturn<SelectedVehiclesDepthSchemaType>;
  arrayForm: UseFieldArrayReturn;
}

function DepthPolicyCreateMultipleForm({
  form,
  arrayForm,
}: DepthPolicyCreateMultipleFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {arrayForm.fields.map((field, index) => {
            return (
              <React.Fragment key={field.id}>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <FormSelectInput
                      name={`depth.${index}.axle_type`}
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
                  <Grid item xs={3}>
                    <FormTextInput
                      sx={{ width: "100%" }}
                      name={`depth.${index}.good_depth`}
                      label={t("labels:good_condition")}
                      inputProps={{ type: "number" }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextInput
                      sx={{ width: "100%" }}
                      name={`depth.${index}.scheduled_withdrawal`}
                      label={t(
                        "labels:depth_tolerance_policies.scheduled_withdrawal",
                      )}
                      inputProps={{ type: "number" }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextInput
                      sx={{ width: "100%" }}
                      name={`depth.${index}.critical_withdrawal`}
                      label={t(
                        "labels:depth_tolerance_policies.critical_withdrawal",
                      )}
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
                critical_withdrawal: 0,
                good_depth: 0,
                scheduled_withdrawal: 0
              })
            }
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
