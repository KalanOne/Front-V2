import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  damageCategoryFilterProps,
  tireAplicattionIdFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import FormFileInput from "src/components/form/FormFileInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { WearUpdateSchemaType } from "../validation/updateWear";

export { WearUpdateForm };

interface WearUpdateFormProps {
  form: UseFormReturn<WearUpdateSchemaType>;
}

function WearUpdateForm({ form }: WearUpdateFormProps): React.ReactElement {
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
          {/* <FormSelectInput
            name={"wear_category"}
            label={t("labels:category.label")}
          >
            <MenuItem value="AVOIDABLE">{"Evitables"}</MenuItem>
            <MenuItem value="HELMET_FAILURE">{"Falla de casco"}</MenuItem>
            <MenuItem value="OPERATION">{"Operación"}</MenuItem>
            <MenuItem value="RETREAD/REPAIR">{"Renovado/Reparación"}</MenuItem>
            <MenuItem value="ROAD_RISK">{"Riesgos del camino"}</MenuItem>
          </FormSelectInput> */}
          <FormAutoComplete
            {...damageCategoryFilterProps}
            name={"wear_category"}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput name={"axle"} label={t("labels:axle.singular")}>
            <MenuItem value="DIRECTIONAL">{"Direccional"}</MenuItem>
            <MenuItem value="TRACTION">{"Tracción"}</MenuItem>
            <MenuItem value="TRAILER">{"Remolque"}</MenuItem>
          </FormSelectInput> */}
          <FormAutoComplete
            {...tireAplicattionIdFilterProps}
            name={"axle"}
            getOptionDisabled={(option) => option.value === "ALL_POSITION"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"probable_causes"}
            label={t("labels:probable_causes")}
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
          <FormTextInput
            sx={{ width: "100%" }}
            name={"action_vehicle"}
            label={t("labels:action_vehicle")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"operation"}
            label={t("labels:action_operation")}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
