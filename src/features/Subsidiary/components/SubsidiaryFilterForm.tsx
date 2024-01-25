import React from "react";

import { FormLabel, Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import FormStatus from "src/components/filter/FormStatus.tsx";
import {
  companiesFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
} from "src/components/filter/formFilterPropsUtils.ts";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import { FormDateInput } from "src/components/form/FormDateInput.tsx";

import { CompanyResponse } from "../../Company/types/companyTypes.ts";
import { SubsidiaryFilterSchemaType } from "../validation/filterSubsidiary.ts";

export { SubsidiaryFilterForm };

interface SubsidiaryFilterFormProps {
  form: UseFormReturn<SubsidiaryFilterSchemaType>;
  companies: CompanyResponse[];
}

function SubsidiaryFilterForm({
  form,
  companies,
}: SubsidiaryFilterFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormStatus label={t("titles:filter.status.subsidiary")} />
        </Grid>
        <Grid item xs={12}>
          <FormLabel>{t("labels:date.range")}</FormLabel>
        </Grid>
        <Grid item xs={12}>
          <FormDateInput {...dateFromFilterProps} name={"dateFrom"} />
        </Grid>
        <Grid item xs={12}>
          <FormDateInput {...dateToFilterProps} name={"dateTo"} />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...companiesFilterProps}
            options={companies}
            multiple={true}
            name={"company_id"}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
