import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  brandFilterProps,
  tireAplicattionIdFilterProps,
} from "src/components/filter/formFilterPropsUtils.ts";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import { FormTextInput } from "src/components/form/FormTextInput.tsx";

import { UseBrandsQueryDependenciesReturns } from "../hooks/dependencies.tsx";
import { RevitalizedTireModelCreateSchemaType } from "../validation/createRevitalizedTireModel.ts";

export { RevitalizedTireModelCreateForm };

interface RevitalizedTireModelCreateFormProps {
  form: UseFormReturn<RevitalizedTireModelCreateSchemaType>;
  dependencies: UseBrandsQueryDependenciesReturns;
}

function RevitalizedTireModelCreateForm({
  form,
  dependencies,
}: RevitalizedTireModelCreateFormProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"name"}
            label={t("common:model")}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput name={"brand_id"} label={t("common:brand")}>
            {dependencies.brands.map((brand) => (
              <MenuItem
                value={brand.brand_id}
                key={brand.brand_id}
                disabled={brand.status === 0 || brand.approved === 0}
              >
                {brand.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...brandFilterProps}
            name={"brand_id"}
            options={dependencies.brands}
            getOptionDisabled={(option) => option.status === 0}
            multiple={false}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput
            name="tire_application_id"
            label={t("labels:tire_application.label.singular")}
          >
            <MenuItem value="ALL_POSITION">
              {t("labels:tire_application.options.all_position")}
            </MenuItem>
            <MenuItem value="DIRECTIONAL">
              {t("labels:tire_application.options.directional")}
            </MenuItem>
            <MenuItem value="TRACTION">
              {t("labels:tire_application.options.traction")}
            </MenuItem>
            <MenuItem value="TRAILER">
              {t("labels:tire_application.options.trailer")}
            </MenuItem>
          </FormSelectInput> */}
          <FormAutoComplete {...tireAplicattionIdFilterProps} />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"depth"}
            label={t("labels:tire_model_variation.depth")}
            inputProps={{ type: "number" }}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
