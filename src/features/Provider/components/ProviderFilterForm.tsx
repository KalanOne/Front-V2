import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";

import FormStatus from "src/components/filter/FormStatus.tsx";
import { subsidiariesFilterProps } from "src/components/filter/formFilterPropsUtils.ts";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes.ts";

import { ProviderFilterSchemaType } from "../validation/filterProvider.ts";
import { useTranslation } from "react-i18next";

export { ProviderFilterForm };

interface ProviderFilterFormProps {
  form: UseFormReturn<ProviderFilterSchemaType>;
  subsidiaries: SubsidiaryInputResponse[];
}

function ProviderFilterForm({
  form,
  subsidiaries,
}: ProviderFilterFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormStatus label={t("titles:filter.status.provider")} />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...subsidiariesFilterProps}
            options={subsidiaries}
            multiple={true}
            name={"subsidiary_id"}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
