import React from "react";

import { Box, Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomButton } from "src/components/common/CustomButton";
import FormFileInput from "src/components/form/FormFileInput";

import { VehiclesExcelSchemaType } from "../validation/excelVehicles";

export { VehiclesExcelForm };

interface VehiclesExcelFormProps {
  form: UseFormReturn<VehiclesExcelSchemaType>;
}

function VehiclesExcelForm({
  form,
}: VehiclesExcelFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              mb: 2,
            }}
          >
            <CustomButton onClick={() => {}} text={"FORMATO"} />
            <CustomButton onClick={() => {}} text={"EJEMPLO"} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <FormFileInput
            placeholder={t("labels:excel_placeholder")}
            name={"excel"}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
