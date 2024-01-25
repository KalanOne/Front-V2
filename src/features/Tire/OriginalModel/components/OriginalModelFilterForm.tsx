import React from "react";

import { Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import FormApproved from "src/components/filter/FormApproved.tsx";
import FormStatus from "src/components/filter/FormStatus.tsx";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import { FormSelectInput } from "src/components/form/FormSelectInput.tsx";
import { FormTextInput } from "src/components/form/FormTextInput.tsx";

import { BrandResponseInput } from "../../../Brand/types/brandTypes.ts";
import { SizeResponseInput } from "../../Size/types/sizeTypes.ts";
import { OriginalModelFilterSchemaType } from "../validation/filterOriginalModel.ts";

export { OriginalModelFilterForm };

interface OriginalModelFilterFormProps {
  form: UseFormReturn<OriginalModelFilterSchemaType>;
  sizesInput: SizeResponseInput[];
  brandsInput: BrandResponseInput[];
}

function OriginalModelFilterForm({
  form,
  sizesInput,
  brandsInput,
}: OriginalModelFilterFormProps): React.ReactElement {
  // const [brands, sizes] = useWatch({
  //   control: form.control,
  //   name: ["brands", "sizes"],
  // });

  // console.log("brands", brands);
  // console.log("sizes", sizes);

  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormStatus label={t("titles:filter.status.tire_model")} />
        </Grid>
        <Grid item xs={12}>
          <FormApproved label={t("general:approval_status")} />
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"tire_model_variation_id"}
            label={"Id"}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormFilterSelectInput
            {...brandFilterProps}
            items={brandsInput}
            multiple={false}
            name={"brands"}
          />
        </Grid> */}
        <Grid item xs={12}>
          <FormAutoComplete
            multiple={false}
            // {...brandFilterProps}
            // items={brandsInput}
            name={"brands"}
            label={t("common:brand")}
            labelExtractor={(brand) => brand.name}
            valueExtractor={(brand) => brand.brand_id}
            options={brandsInput}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <FormFilterSelectInput
            {...sizesFilterProps}
            items={sizesInput}
            multiple={true}
            name={"sizes"}
          /> */}
          <FormAutoComplete
            multiple={true}
            // {...brandFilterProps}
            // items={brandsInput}
            name={"sizes"}
            label={t("common:size")}
            labelExtractor={(size: SizeResponseInput) => size.size}
            valueExtractor={(size: SizeResponseInput) => size.tire_size_id}
            options={sizesInput}
            virtualized={true}
          />
        </Grid>
        <Grid item xs={12}>
          <FormSelectInput
            name="tire_application_id"
            label={t("labels:tire_application.label.singular")}
            multiple={true}
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
          </FormSelectInput>
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"depth"}
            label={t("labels:tire_model_variation.depth")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"maximum_pressure"}
            label={t("labels:tire_model_variation.maximum_pressure")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"number_layers"}
            label={t("labels:tire_model_variation.number_layers")}
            inputProps={{ type: "number" }}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
