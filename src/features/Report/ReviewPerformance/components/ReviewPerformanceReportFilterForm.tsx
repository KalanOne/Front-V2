import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";

import {
  companiesFilterProps,
  corporateFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
  subsidiariesFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormDateInput } from "src/components/form/FormDateInput";
import { UseFilterDependenciesReturn } from "src/hooks/dependencies";

import {
  ReviewPerformanceReportFilterInputType,
  ReviewPerformanceReportFilterSchemaType,
} from "../validation/filterForm";

export { ReviewPerformanceReportFilterForm };

interface ReviewPerformanceReportFilterFormProps {
  form: UseFormReturn<
    ReviewPerformanceReportFilterInputType,
    unknown,
    ReviewPerformanceReportFilterSchemaType
  >;
  dependencies: UseFilterDependenciesReturn;
}

function ReviewPerformanceReportFilterForm({
  form,
  dependencies,
}: ReviewPerformanceReportFilterFormProps): React.ReactElement {
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
        </Grid>
      </FormProvider>
    </>
  );
}
