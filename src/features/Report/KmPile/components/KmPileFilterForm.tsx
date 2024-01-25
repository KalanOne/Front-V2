import { useEffect, useState } from "react";

import { FormLabel, Grid } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  brandFilterProps,
  companiesFilterProps,
  conditionFilterProps2,
  corporateFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
  modelsFilterProps,
  sizesFilterProps,
  subsidiariesFilterProps,
  tireAplicattionIdFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormDateInput } from "src/components/form/FormDateInput";
import { FormTextInput } from "src/components/form/FormTextInput";
import { UseFilterDependenciesReturn } from "src/hooks/dependencies";

import {
  KmPileFilterInputType,
  KmPileFilterSchemaType,
} from "../validation/filterKmPile";

export { KmPileFilterForm };

interface KmPileFilterFormProps {
  form: UseFormReturn<KmPileFilterInputType, unknown, KmPileFilterSchemaType>;
  dependencies: UseFilterDependenciesReturn;
}

function KmPileFilterForm({ form, dependencies }: KmPileFilterFormProps) {
  const { t } = useTranslation();
  const [isFirstRun, setIsFirstRun] = useState(true);
  const [corporate_id, companies, brands] = useWatch({
    control: form.control,
    name: ["corporate_id", "companies", "brands"],
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

  useEffect(() => {
    if (brands.length === 0) {
      form.setValue("models", []);
    }
  }, [brands]);

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
        <Grid item xs={6}>
          <FormAutoComplete
            {...brandFilterProps}
            options={dependencies.brands}
            multiple={true}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...modelsFilterProps}
            options={dependencies.models}
            multiple={true}
          />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...sizesFilterProps}
            options={dependencies.sizes}
            multiple={true}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete {...conditionFilterProps2} multiple={true} />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...tireAplicattionIdFilterProps}
            name={"tire_application"}
            multiple={true}
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
  );
}
