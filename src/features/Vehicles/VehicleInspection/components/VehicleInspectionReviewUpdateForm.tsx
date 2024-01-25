import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormDateInput } from "src/components/form/FormDateInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { UpdateVehicleReviewSchemaType } from "../validation/updateVehicleReview";

export { VehicleInspectionReviewUpdateForm };

interface VehicleInspectionReviewUpdateFormProps {
  form: UseFormReturn<UpdateVehicleReviewSchemaType>;
}

function VehicleInspectionReviewUpdateForm({
  form,
}: VehicleInspectionReviewUpdateFormProps) {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormDateInput name={"date"} label={t("labels:date.label")} />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            name={"odometer"}
            label={t("labels:odometer")}
            inputProps={{ type: "number" }}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            name={"observation"}
            label={t("labels:observation")}
            sx={{ width: "100%" }}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
