import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  FormRadioInput,
  FormRadioOption,
} from "src/components/form/FormRadioInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { PhysicalDifferenceSchemaType } from "../validation/physicalDifference";

export { VehicleInspectionPhysicalForm };

interface VehicleInspectionPhysicalFormProps {
  form: UseFormReturn<PhysicalDifferenceSchemaType>;
}

function VehicleInspectionPhysicalForm({
  form,
}: VehicleInspectionPhysicalFormProps) {
  const { t } = useTranslation();
  const [type] = useWatch({
    control: form.control,
    name: ["type"],
  });
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormRadioInput name="type" label="">
            <FormRadioOption value="code" label={t("labels:code")} />
            <FormRadioOption
              value="device_code"
              label={t("labels:rfid_field.label")}
            />
          </FormRadioInput>
        </Grid>
        {type === "code" && (
          <Grid item xs={12}>
            <FormTextInput
              name="code"
              label={t("labels:code")}
              sx={{ width: "100%" }}
            />
          </Grid>
        )}
        {type === "device_code" && (
          <Grid item xs={12}>
            <FormTextInput
              name="device_code"
              label={t("labels:rfid_field.label")}
              sx={{ width: "100%" }}
            />
          </Grid>
        )}
      </Grid>
    </FormProvider>
  );
}
