import { Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { AlertUpdateSchemaType } from "../validation/updateAlert";

export { AlertUpdateForm };

interface AlertUpdateFormProps {
  form: UseFormReturn<AlertUpdateSchemaType>;
}

function AlertUpdateForm({ form }: AlertUpdateFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"code"}
            label={t("labels:alert.code")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormSelectInput
            name={"priority"}
            label={t("labels:priority.label")}
            required={true}
          >
            <MenuItem value="HIGH">
              {t("labels:priority.options.high")}
            </MenuItem>
            <MenuItem value="MEDIUM">
              {t("labels:priority.options.half")}
            </MenuItem>
            <MenuItem value="LOW">{t("labels:priority.options.low")}</MenuItem>
          </FormSelectInput>
        </Grid>
        <Grid item xs={6}>
          <FormSelectInput
            name={"alert_type"}
            label={t("labels:alert_type.label")}
            required={true}
          >
            <MenuItem value="VEHICLE">
              {t("labels:alert_type.options.vehicle")}
            </MenuItem>
            <MenuItem value="TIRE">
              {t("labels:alert_type.options.tire")}
            </MenuItem>
            <MenuItem value="MOUNT">
              {t("labels:alert_type.options.mount")}
            </MenuItem>
          </FormSelectInput>
        </Grid>
        <Grid item xs={6}>
          <FormSelectInput
            name={"ranking_alert"}
            label={t("labels:ranking_alert.label")}
            required={true}
          >
            <MenuItem value="PRESSURE">
              {t("labels:ranking_alert.options.pressure")}
            </MenuItem>
            <MenuItem value="DEPTH">
              {t("labels:ranking_alert.options.depth")}
            </MenuItem>
          </FormSelectInput>
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"details"}
            label={t("labels:alert.details")}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"suggestion"}
            label={t("labels:alert.suggestion")}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
