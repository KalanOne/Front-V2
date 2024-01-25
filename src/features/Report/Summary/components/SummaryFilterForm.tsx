import { useEffect, useState } from "react";

import { FormLabel, Grid } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  activityFilterProps,
  companiesFilterProps,
  corporateFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
  depthClasificationFilterProps,
  movementFilterProps2,
  pressureClasificationFilterProps,
  reviewTypeFilterProps,
  subsidiariesFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormCheckboxInput } from "src/components/form/FormCheckboxInput";
import { FormDateInput } from "src/components/form/FormDateInput";
import { FormTextInput } from "src/components/form/FormTextInput";
import { UseFilterDependenciesReturn } from "src/hooks/dependencies";

import {
  SummaryFilterInputType,
  SummaryFilterSchemaType,
} from "../validation/filterSummary";

export { SummaryFilterForm };

interface SummaryFilterFormProps {
  form: UseFormReturn<SummaryFilterInputType, unknown, SummaryFilterSchemaType>;
  dependencies: UseFilterDependenciesReturn;
}

function SummaryFilterForm({ form, dependencies }: SummaryFilterFormProps) {
  const { t } = useTranslation();
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
    form.setValue("companies", "");
    form.setValue("subsidiaries", []);
  }, [corporate_id]);

  useEffect(() => {
    if (companies === "") {
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
            multiple={false}
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
          <FormAutoComplete {...movementFilterProps2} />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete {...pressureClasificationFilterProps} />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete {...depthClasificationFilterProps} />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete {...activityFilterProps} />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete {...reviewTypeFilterProps} multiple={false} />
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"number_cycle"}
            label={t("labels:number_cycle")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormCheckboxInput
            label={t("labels2:show_refection")}
            name="with_refection"
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
