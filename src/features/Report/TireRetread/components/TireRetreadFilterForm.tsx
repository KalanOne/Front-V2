import { useEffect, useState } from "react";

import { FormLabel, Grid } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";

import {
  companiesFilterProps,
  corporateFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
  providersFilterProps,
  subsidiariesFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormDateInput } from "src/components/form/FormDateInput";

import { UseTireRetreadDependenciesReturns } from "../hooks/dependencies";
import {
  TireRetreadFilterInputType,
  TireRetreadFilterSchemaType,
} from "../validation/filterTireRetread";

export { TireRetreadFilterForm };

interface TireRetreadFilterFormProps {
  form: UseFormReturn<
    TireRetreadFilterInputType,
    unknown,
    TireRetreadFilterSchemaType
  >;
  dependencies: UseTireRetreadDependenciesReturns;
}

function TireRetreadFilterForm({
  form,
  dependencies,
}: TireRetreadFilterFormProps) {
  const [isFirstRun, setIsFirstRun] = useState(true);
  const [corporate_id, companies, subsidiaries] = useWatch({
    control: form.control,
    name: ["corporate_id", "companies", "subsidiaries"],
  });

  useEffect(() => {
    if (isFirstRun) {
      setIsFirstRun(false);
      return;
    }
    form.setValue("companies", []);
    form.setValue("subsidiaries", []);
    form.setValue("providers", []);
  }, [corporate_id]);

  useEffect(() => {
    if (companies.length === 0) {
      form.setValue("subsidiaries", []);
      form.setValue("providers", []);
    }
  }, [companies]);

  useEffect(() => {
    if (subsidiaries.length === 0) {
      form.setValue("providers", []);
    }
  }, [subsidiaries]);

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormLabel>Rango de Fechas</FormLabel>
        </Grid>
        <Grid item xs={6}>
          <FormDateInput {...dateFromFilterProps} />
        </Grid>
        <Grid item xs={6}>
          <FormDateInput {...dateToFilterProps} />
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
            name={"companies"}
            options={dependencies.companies}
          />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...subsidiariesFilterProps}
            options={dependencies.subsidiaries}
            multiple={true}
          />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...providersFilterProps}
            options={dependencies.providers}
            multiple={true}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
