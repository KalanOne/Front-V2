import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormTextInput } from "src/components/form/FormTextInput.tsx";

import { CauseCreateSchemaType } from "../validation/createRetirementCause.ts";

export { RetirementCauseCreateForm };

interface RetirementCauseCreateFormProps {
  form: UseFormReturn<CauseCreateSchemaType>;
}

function RetirementCauseCreateForm({
  form,
}: RetirementCauseCreateFormProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"name"}
            label={t("common:name")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"description"}
            label={t("labels:description")}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
