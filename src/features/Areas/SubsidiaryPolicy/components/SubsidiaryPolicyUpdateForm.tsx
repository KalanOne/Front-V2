import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormCheckboxInput } from "src/components/form/FormCheckboxInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { SubsidiaryPolicyUpdateSchemaType } from "../validation/updateSubsidiaryPolicy";

export { SubsidiaryPolicyUpdateForm };

interface SubsidiaryPolicyUpdateFormProps {
  form: UseFormReturn<SubsidiaryPolicyUpdateSchemaType>;
}

function SubsidiaryPolicyUpdateForm({
  form,
}: SubsidiaryPolicyUpdateFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"number_cycle"}
            label={t("labels:company_policies.number_cycle")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"inspection"}
            label={t("labels:company_policies.inspection")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"tolerance_inflation_pressure"}
            label={t("labels:company_policies.tolerance_inflation_pressure")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"tolerance_mating_pressure"}
            label={t("labels:company_policies.tolerance_mating_pressure")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"tolerance_directional_mating_depth"}
            label={t(
              "labels:company_policies.mating_tolerance_directional_mating_depth",
            )}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"tolerance_mating_depth"}
            label={t("labels:company_policies.tolerance_mating_depth")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"tire_rotation"}
            label={t("labels:company_policies.tire_rotation")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"directional_tire_rotation"}
            label={t("labels:company_policies.directional_tire_rotation")}
            inputProps={{ type: "number" }}
          />
        </Grid>

        <Grid item xs={6}>
          <FormCheckboxInput
            label={t("labels:company_policies.pressure_type_axle")}
            name="pressure_type_axle"
          />
        </Grid>
        <Grid item xs={6}>
          <FormCheckboxInput
            label={t("labels:company_policies.helmet_policy")}
            name="helmet_policy"
          />
        </Grid>
        <Grid item xs={6}>
          <FormCheckboxInput
            label={t("labels:company_policies.tire_condition_axle_type")}
            name="tire_condition_axle_type"
          />
        </Grid>
        <Grid item xs={6}>
          <FormCheckboxInput
            label={t(
              "labels:company_policies.show_alerts_different_assignment",
            )}
            name="show_alerts_different_assignment"
          />
        </Grid>
        <Grid item xs={6}>
          <FormCheckboxInput
            label={t("labels:company_policies.send_pressure_setting")}
            name="send_pressure_setting"
          />
        </Grid>
        <Grid item xs={6}>
          <FormCheckboxInput
            label={t("labels:company_policies.operator_edit")}
            name="operator_edit"
          />
        </Grid>
        <Grid item xs={6}>
          <FormCheckboxInput
            label={t("labels:company_policies.refection_review")}
            name="refection_review"
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
