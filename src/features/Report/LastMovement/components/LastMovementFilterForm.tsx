import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  brandFilterProps,
  companiesFilterProps,
  corporateFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
  modelsFilterProps,
  sizesFilterProps,
  subsidiariesFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormDateInput } from "src/components/form/FormDateInput";
import { UseFilterDependenciesReturn } from "src/hooks/dependencies";

import {
  LastMovementFilterInputType,
  LastMovementFilterSchemaType,
} from "../validation/filterForm";

export { LastMovementFilterForm };

interface LastMovementFilterFormProps {
  form: UseFormReturn<
    LastMovementFilterInputType,
    unknown,
    LastMovementFilterSchemaType
  >;
  dependencies: UseFilterDependenciesReturn;
}

function LastMovementFilterForm({
  form,
  dependencies,
}: LastMovementFilterFormProps): React.ReactElement {
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
        </Grid>
      </FormProvider>
    </>
  );
}
