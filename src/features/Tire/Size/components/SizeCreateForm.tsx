import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormTextInput } from "src/components/form/FormTextInput.tsx";

import { SizeCreateSchemaType } from "../validation/createSize.ts";

export { SizeCreateForm };

interface SizeCreateFormProps {
  form: UseFormReturn<SizeCreateSchemaType>;
}

function SizeCreateForm({ form }: SizeCreateFormProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"size"}
            label={t("common:size")}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
