import React from "react";

import { Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { UseVehicleTypeDependenciesReturns } from "../hooks/dependenciesVehicleType";
import { VehicleTypePolicyCreateSchemaType } from "../validation/createVehicleTypePolicy";

export { PressurePolicyVehicleTypeForm };

interface PressurePolicyVehicleTypeFormProps {
  form: UseFormReturn<VehicleTypePolicyCreateSchemaType>;
  dependencies: UseVehicleTypeDependenciesReturns;
}

function PressurePolicyVehicleTypeForm({
  form,
  dependencies,
}: PressurePolicyVehicleTypeFormProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormSelectInput
            name="vehicle_type_id"
            label={t("labels:vehicle_type.label")}
          >
            {dependencies.vehicleType?.map((vehicle: any) => (
              <MenuItem
                value={vehicle.vehicle_type_id}
                key={vehicle.vehicle_type_id}
              >
                {vehicle.name}
              </MenuItem>
            ))}
          </FormSelectInput>
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
