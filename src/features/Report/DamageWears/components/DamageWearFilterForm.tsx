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
  DamageWearFilterInputType,
  DamageWearFilterSchemaType,
} from "../validation/filterForm";

export { DamageWearFilterForm };

interface DamageWearFilterFormProps {
  form: UseFormReturn<
    DamageWearFilterInputType,
    unknown,
    DamageWearFilterSchemaType
  >;
  dependencies: UseFilterDependenciesReturn;
}

function DamageWearFilterForm({
  form,
  dependencies,
}: DamageWearFilterFormProps): React.ReactElement {
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
