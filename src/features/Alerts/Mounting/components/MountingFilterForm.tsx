import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  brandFilterProps,
  driversFilterProps,
  vehicleTypeFilterProps,
  vehiclesFilterProps,
} from "src/components/filter/formFilterPropsUtils.ts";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";

import { UseAlertMountingDependenciesArgsReturn } from "../hooks/dependencies.ts";
import { MountingFilterSchemaType } from "../validation/filterMounting.ts";

export { MountingFilterForm };
interface MountingFilterFormProps {
  form: UseFormReturn<MountingFilterSchemaType>;
  dependencies: UseAlertMountingDependenciesArgsReturn;
}

function MountingFilterForm({
  form,
  dependencies,
}: MountingFilterFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormAutoComplete
            {...brandFilterProps}
            options={dependencies.brands}
            multiple={true}
            name={"vehicle_brand_id"}
            label={t("labels:vehicle_brand.label")}
          />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...vehicleTypeFilterProps}
            options={dependencies.vehiclesTypes}
            multiple={false}
          />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...vehiclesFilterProps}
            options={dependencies.vehicles}
            multiple={false}
            label={t("labels:economic_number")}
            name={"vehicle_id"}
          />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...driversFilterProps}
            options={dependencies.drivers}
            multiple={false}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
