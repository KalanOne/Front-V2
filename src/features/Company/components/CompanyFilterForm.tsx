import React from "react";

import { FormLabel, Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";

import { FormFilterSelectInput } from "src/components/filter/FormFilterSelectInput.tsx";
import FormStatus from "src/components/filter/FormStatus.tsx";
import {
  corporateFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
} from "src/components/filter/formFilterPropsUtils.ts";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import { FormDateInput } from "src/components/form/FormDateInput.tsx";
import { CorporateResponse } from "src/features/Corporate/types/corporateTypes.ts";

import { CompanyFilterSchemaType } from "../validation/filterCompany.ts";
import { useTranslation } from "react-i18next";

export { CompanyFilterForm };

interface CompanyFilterFormProps {
  form: UseFormReturn<CompanyFilterSchemaType>;
  corporates: CorporateResponse[];
}

function CompanyFilterForm({
  form,
  corporates,
}: CompanyFilterFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormStatus label={t("titles:filter.status.company")} />
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
            {...corporateFilterProps}
            options={corporates}
            multiple={true}
            name={"corporate_id"}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
