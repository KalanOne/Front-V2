import { Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  areasFilterProps,
  damageCategoryFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormCheckboxInput } from "src/components/form/FormCheckboxInput";
import FormFileInput from "src/components/form/FormFileInput";
import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { DamageUpdateSchemaType } from "../validation/updateDamage";

export { DamageUpdateForm };

interface DamageUpdateFormProps {
  form: UseFormReturn<DamageUpdateSchemaType>;
}

function DamageUpdateForm({ form }: DamageUpdateFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormFileInput
            name={"image"}
            placeholder={t("labels:placeholder.image")}
          />
        </Grid>
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
            name={"appearance"}
            label={t("labels:appearance")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"probable_causes"}
            label={t("labels:probable_cause")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"operation"}
            label={t("labels:action_operation")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"action_vehicle"}
            label={t("labels:action_vehicle")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"action_tire"}
            label={t("labels:action_tire")}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput
            name={"damage_category"}
            label={t("labels:category.label")}
            required={true}
          >
            <MenuItem value="AVOIDABLE">{"Evitables"}</MenuItem>
            <MenuItem value="HELMET_FAILURE">{"Falla de casco"}</MenuItem>
            <MenuItem value="OPERATION">{"Operación"}</MenuItem>
            <MenuItem value="RETREAD/REPAIR">{"Renovado/Reparación"}</MenuItem>
            <MenuItem value="ROAD_RISK">{"Riesgos del camino"}</MenuItem>
          </FormSelectInput> */}
          <FormAutoComplete {...damageCategoryFilterProps} />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput name={"area"} label={t("labels:area.label")}>
            <MenuItem value="SIDEWALL">{"Costado"}</MenuItem>
            <MenuItem value="BEAD">{"Ceja"}</MenuItem>
            <MenuItem value="TREAD">{"Corona"}</MenuItem>
            <MenuItem value="INSIDE">{"Interior"}</MenuItem>
            <MenuItem value="ANY">{"Cualquiera"}</MenuItem>
          </FormSelectInput> */}
          <FormAutoComplete {...areasFilterProps} />
        </Grid>
        <Grid item xs={12}>
          <FormCheckboxInput
            label={t("labels:lock_cycle")}
            name={"lock_cycles"}
          ></FormCheckboxInput>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
