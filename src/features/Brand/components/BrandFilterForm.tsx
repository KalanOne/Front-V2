import React from "react";

import { FormLabel, Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import FormApproved from "src/components/filter/FormApproved.tsx";
import { FormFilterSelectInput } from "src/components/filter/FormFilterSelectInput.tsx";
import FormStatus from "src/components/filter/FormStatus.tsx";
import {
  brandTypeFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
} from "src/components/filter/formFilterPropsUtils.ts";
import { FormDateInput } from "src/components/form/FormDateInput.tsx";

import { BrandFilterSchemaType } from "../validation/filterBrand.ts";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";

export { BrandFilterForm };

interface BrandFilterFormProps {
  form: UseFormReturn<BrandFilterSchemaType>;
}

function BrandFilterForm({ form }: BrandFilterFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormStatus label={t("titles:filter.status.brand")} />
        </Grid>
        <Grid item xs={12}>
          <FormApproved label={t("general:approval_status")} />
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
            {...brandTypeFilterProps}
            multiple={true}
            name={"brandType"}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
