import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { brandTypeFilterProps } from "src/components/filter/formFilterPropsUtils.ts";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import { FormTextInput } from "src/components/form/FormTextInput.tsx";

import { BrandCreateSchemaType } from "../validation/createBrand.ts";

export { BrandCreateForm };

interface BrandCreateFormProps {
  form: UseFormReturn<BrandCreateSchemaType>;
}

function BrandCreateForm({ form }: BrandCreateFormProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"name"}
            label={t("common:name")}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput name={"brandType"} label={"Tipo de Marca"}>
            <MenuItem value="VEHICLE">
              {t("labels:brand_type.options.vehicle")}
            </MenuItem>
            <MenuItem value="TIRE">
              {t("labels:brand_type.options.tire")}
            </MenuItem>
            <MenuItem value="ENGINE_TRANSMISSION">
              {t("labels:brand_type.options.engine_transmission")}
            </MenuItem>
            <MenuItem value="VEHICLE_ENGINE">
              {t("labels:brand_type.options.vehicle_engine")}
            </MenuItem>
            <MenuItem value="RETREAD">
              {t("labels:brand_type.options.retread")}
            </MenuItem>
          </FormSelectInput> */}
          <FormAutoComplete {...brandTypeFilterProps} />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
