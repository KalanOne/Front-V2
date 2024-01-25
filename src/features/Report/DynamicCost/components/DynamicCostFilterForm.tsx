import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  brandFilterProps,
  companiesFilterProps,
  conditionFilterProps,
  corporateFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
  modelsFilterProps,
  movementFilterProps,
  sizesFilterProps,
  subsidiariesFilterProps,
  tireAplicattionIdFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormDateInput } from "src/components/form/FormDateInput";
import { FormTextInput } from "src/components/form/FormTextInput";
import { UseFilterDependenciesReturn } from "src/hooks/dependencies";

import {
  DynamicCostFilterInputType,
  DynamicCostFilterSchemaType,
} from "../validation/filterForm";

export { DynamicCostFilterForm };

interface DynamicCostFilterFormProps {
  form: UseFormReturn<
    DynamicCostFilterInputType,
    unknown,
    DynamicCostFilterSchemaType
  >;
  dependencies: UseFilterDependenciesReturn;
}

function DynamicCostFilterForm({
  form,
  dependencies,
}: DynamicCostFilterFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <>
      <FormProvider {...form}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormDateInput {...dateFromFilterProps} name={"dateFrom"} />
          </Grid>
          <Grid item xs={6}>
            <FormDateInput {...dateToFilterProps} name={"dateTo"} />
          </Grid>
          <Grid item xs={12}>
            <FormAutoComplete
              {...movementFilterProps}
              multiple={false}
              name={"movement"}
            />
          </Grid>
          <Grid item xs={12}>
            <FormAutoComplete
              {...corporateFilterProps}
              options={dependencies.corporates}
              multiple={false}
              name={"corporate_id"}
            />
          </Grid>
          <Grid item xs={12}>
            <FormAutoComplete
              {...companiesFilterProps}
              options={dependencies.companies}
              multiple={true}
              name={"companies"}
            />
          </Grid>
          <Grid item xs={12}>
            <FormAutoComplete
              {...subsidiariesFilterProps}
              options={dependencies.subsidiaries}
              multiple={true}
              name={"subsidiaries"}
            />
          </Grid>
          <Grid item xs={6}>
            <FormAutoComplete
              {...brandFilterProps}
              options={dependencies.brands}
              multiple={false}
              name={"brand_id"}
            />
          </Grid>
          <Grid item xs={6}>
            <FormAutoComplete
              {...modelsFilterProps}
              options={dependencies.models}
              multiple={false}
              name={"model_id"}
            />
          </Grid>
          <Grid item xs={12}>
            <FormAutoComplete
              {...sizesFilterProps}
              options={dependencies.sizes}
              multiple={false}
              name={"size_id"}
            />
          </Grid>
          <Grid item xs={6}>
            <FormAutoComplete
              {...conditionFilterProps}
              multiple={false}
              name={"condition"}
            />
          </Grid>
          <Grid item xs={6}>
            <FormAutoComplete
              {...tireAplicattionIdFilterProps}
              multiple={false}
              name={"tire_application"}
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextInput
              sx={{ width: "100%" }}
              name={"price"}
              label={t("labels:price")}
              inputProps={{ type: "number" }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextInput
              sx={{ width: "100%" }}
              name={"helmet_value"}
              label={t("labels:helmet_value")}
              inputProps={{ type: "number" }}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
