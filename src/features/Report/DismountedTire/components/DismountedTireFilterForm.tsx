import { useEffect, useState } from "react";

import { FormLabel, Grid } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";

import {
  companiesFilterProps,
  corporateFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
  subsidiariesFilterProps,
  warehousesFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormDateInput } from "src/components/form/FormDateInput";

import { UseDismountedTireDependenciesReturns } from "../hooks/dependencies";
import {
  DismountedTireFilterInputType,
  DismountedTireFilterSchemaType,
} from "../validation/filterDismountedTire";

export { DismountedTireFilterForm };

interface DismountedTireFilterFormProps {
  form: UseFormReturn<
    DismountedTireFilterInputType,
    unknown,
    DismountedTireFilterSchemaType
  >;
  dependencies: UseDismountedTireDependenciesReturns;
}

function DismountedTireFilterForm({
  form,
  dependencies,
}: DismountedTireFilterFormProps) {
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
    form.setValue("warehouses", []);
  }, [corporate_id]);

  useEffect(() => {
    if (companies.length === 0) {
      form.setValue("subsidiaries", []);
      form.setValue("warehouses", []);
    }
  }, [companies]);

  useEffect(() => {
    if (subsidiaries.length === 0) {
      form.setValue("warehouses", []);
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
            {...warehousesFilterProps}
            options={dependencies.wareHouses}
            multiple={true}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
