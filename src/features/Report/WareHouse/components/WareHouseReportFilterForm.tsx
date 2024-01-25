import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";

import {
  brandFilterProps,
  brandRevilatizedFilterProps,
  companiesFilterProps,
  conditionFilterProps,
  corporateFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
  modelRevitalizedFilterProps,
  modelsFilterProps,
  providersFilterProps,
  subsidiariesFilterProps,
  tireAplicattionIdFilterProps,
  variationsFilterProps,
  warehousesFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormDateInput } from "src/components/form/FormDateInput";
import { UseFilterDependenciesReturn } from "src/hooks/dependencies";

import {
  WareHouseReportFilterInputType,
  WareHouseReportFilterSchemaType,
} from "../validation/filterForm";

export { WareHouseReportFilterForm };

interface WareHouseReportFilterFormProps {
  form: UseFormReturn<
    WareHouseReportFilterInputType,
    unknown,
    WareHouseReportFilterSchemaType
  >;
  dependencies: UseFilterDependenciesReturn;
}

function WareHouseReportFilterForm({
  form,
  dependencies,
}: WareHouseReportFilterFormProps): React.ReactElement {
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
              multiple={false}
              name={"company_id"}
            />
          </Grid>
          <Grid item xs={12}>
            <FormAutoComplete
              {...subsidiariesFilterProps}
              options={dependencies.subsidiaries}
              multiple={false}
              name={"subsidiary_id"}
            />
          </Grid>
          <Grid item xs={12}>
            <FormAutoComplete
              {...warehousesFilterProps}
              options={dependencies.warehouses}
              multiple={false}
              name={"warehouse_id"}
            />
          </Grid>
          <Grid item xs={12}>
            <FormAutoComplete
              {...providersFilterProps}
              options={dependencies.providers}
              multiple={false}
              name={"provider_id"}
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
              {...variationsFilterProps}
              options={dependencies.variations}
              multiple={true}
              name={"tire_model_variation_id"}
            />
          </Grid>
          <Grid item xs={6}>
            <FormAutoComplete
              {...brandRevilatizedFilterProps}
              options={dependencies.brandsRetread}
              multiple={false}
              name={"brandRetread_id"}
            />
          </Grid>
          <Grid item xs={6}>
            <FormAutoComplete
              {...modelRevitalizedFilterProps}
              options={dependencies.modelsRevitalized}
              multiple={false}
              name={"modelRevitalized_id"}
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
        </Grid>
      </FormProvider>
    </>
  );
}
