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
  SemaphoreFilterInputType,
  SemaphoreFilterSchemaType,
} from "../validation/filterForm";

export { SemaphoreReportFilterForm };

interface SemaphoreReportFilterFormProps {
  form: UseFormReturn<
    SemaphoreFilterInputType,
    unknown,
    SemaphoreFilterSchemaType
  >;
  dependencies: UseFilterDependenciesReturn;
}

function SemaphoreReportFilterForm({
  form,
  dependencies,
}: SemaphoreReportFilterFormProps): React.ReactElement {
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
        </Grid>
      </FormProvider>
    </>
  );
}
