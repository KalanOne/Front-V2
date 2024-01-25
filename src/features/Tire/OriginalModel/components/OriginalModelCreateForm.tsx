import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  brandFilterProps,
  sizesOriginalFilterProps,
  tireAplicattionIdFilterProps,
  tireModelVariationUseFilterProps,
} from "src/components/filter/formFilterPropsUtils.ts";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import FormFileInput from "src/components/form/FormFileInput.tsx";
import { FormTextInput } from "src/components/form/FormTextInput.tsx";
import { BrandResponseInput } from "src/features/Brand/types/brandTypes.ts";

import { SizeResponseInput } from "../../Size/types/sizeTypes.ts";
import { OriginalModelCreateSchemaType } from "../validation/createOriginalModel.ts";

// import { FormFileInput } from 'src/components/form/FormFileInput.tsx';

export { OriginalModelCreateForm };

interface OriginalModelCreateFormProps {
  form: UseFormReturn<OriginalModelCreateSchemaType>;
  sizesInput: SizeResponseInput[];
  brandsInput: BrandResponseInput[];
}

function OriginalModelCreateForm({
  form,
  sizesInput,
  brandsInput,
}: OriginalModelCreateFormProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormFileInput
            placeholder={t("labels:data_sheet.placeholder")}
            // accept={""}
            name={"data_sheet"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"name"}
            label={t("labels:tire_model.model_name")}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput name={"tire_size_id"} label={t("common:size")}>
            {sizesInput.map((size) => (
              <MenuItem
                value={size.tire_size_id}
                key={size.tire_size_id}
                disabled={size.status === 0 || size.approved === 0}
              >
                {size.size}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...sizesOriginalFilterProps}
            name="tire_size_id"
            options={sizesInput}
            getOptionDisabled={(option) =>
              option.status === 0 || option.approved === 0
            }
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput name={"brand_id"} label={t("common:brand")}>
            {brandsInput.map((brand) => (
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
            name="brand_id"
            options={brandsInput}
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
            name={"number_layers"}
            label={t("labels:tire_model_variation.number_layers")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"depth"}
            label={t("labels:tire_model_variation.depth")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"maximum_pressure"}
            label={t("labels:tire_model_variation.maximum_pressure")}
            inputProps={{ type: "number" }}
          />
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
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"helmet_value_original"}
            label={t("labels:helmet_value")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"helmet_value_revitalized"}
            label={t("labels:helmet_value_revitalized")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput
            name="tire_model_variation_use"
            label={t("labels:tire_model.use")}
            multiple={true}
          >
            <MenuItem value="LONG_DISTANCE">
              {t("labels:tire_use.options.long_distance")}
            </MenuItem>
            <MenuItem value="MIXED">
              {t("labels:tire_use.options.mixed")}
            </MenuItem>
            <MenuItem value="REGIONAL">
              {t("labels:tire_use.options.regional")}
            </MenuItem>
            <MenuItem value="URBAN">
              {t("labels:tire_use.options.urban")}
            </MenuItem>
          </FormSelectInput> */}
          <FormAutoComplete {...tireModelVariationUseFilterProps} />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
