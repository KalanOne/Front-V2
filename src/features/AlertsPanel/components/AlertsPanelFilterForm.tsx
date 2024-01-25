import { useEffect, useState } from "react";

import { FormLabel, Grid } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";

import {
  alertClasificationFilterProps2,
  alertsFilterProps,
  companiesFilterProps,
  corporateFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
  priorityFilterProps,
  subsidiariesFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormDateInput } from "src/components/form/FormDateInput";
import { UseFilterDependenciesReturn } from "src/hooks/dependencies";

import {
  AlertsPanelFilterInputType,
  AlertsPanelFilterSchemaType,
} from "../validation/filterAlertsPanel";

export { AlertsPanelFilterForm };

interface AlertsPanelFilterFormProps {
  form: UseFormReturn<
    AlertsPanelFilterInputType,
    unknown,
    AlertsPanelFilterSchemaType
  >;
  dependencies: UseFilterDependenciesReturn;
}

function AlertsPanelFilterForm({
  form,
  dependencies,
}: AlertsPanelFilterFormProps) {
  const [isFirstRun, setIsFirstRun] = useState(true);

  const [corporate_id, companies] = useWatch({
    control: form.control,
    name: ["corporate_id", "companies"],
  });

  useEffect(() => {
    if (isFirstRun) {
      setIsFirstRun(false);
      return;
    }
    form.setValue("companies", []);
    form.setValue("subsidiaries", []);
  }, [corporate_id]);

  useEffect(() => {
    if (companies.length === 0) {
      form.setValue("subsidiaries", []);
    }
  }, [companies]);

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
            {...alertsFilterProps}
            multiple={true}
            options={dependencies.alerts}
          />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete {...alertClasificationFilterProps2} />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete {...priorityFilterProps} />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
