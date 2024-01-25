import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  modelsFilterProps,
  variationsFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormTextInput } from "src/components/form/FormTextInput";

import { useSubsidiaryHelmetValueDependenciesReturn } from "../hooks/dependencies";
import { SubsidiaryHelmetValueCreateSchemaType } from "../validation/createSubsidiaryHelmetValue";

export { SubsidiaryHelmetValueCreateForm };

interface SubsidiaryHelmetValueCreateFormProps {
  form: UseFormReturn<SubsidiaryHelmetValueCreateSchemaType>;
  dependencies: useSubsidiaryHelmetValueDependenciesReturn;
}

function SubsidiaryHelmetValueCreateForm({
  form,
  dependencies,
}: SubsidiaryHelmetValueCreateFormProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormAutoComplete
            {...modelsFilterProps}
            name="tire_model_id"
            options={dependencies.models}
            multiple={false}
            getOptionDisabled={(option) =>
              option.tire_model.status === 0 || option.tire_model.approved === 0
            }
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...variationsFilterProps}
            options={dependencies.variations}
            getOptionDisabled={(option) =>
              option.status === 0 || option.approved === 0
            }
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"helmet_value_original"}
            label={t("labels:helmet_value")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"helmet_value_revitalized"}
            label={t("labels:helmet_value_revitalized")}
            inputProps={{ type: "number" }}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
