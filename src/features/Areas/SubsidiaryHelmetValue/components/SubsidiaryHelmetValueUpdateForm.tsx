import { Grid } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  modelsFilterProps,
  variationsFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormTextInput } from "src/components/form/FormTextInput";
import { useProgressQuery } from "src/hooks/progress";

import { getVariations } from "../api/inputsApi";
import { useSubsidiaryHelmetValueDependenciesReturn } from "../hooks/dependencies";
import { SubsidiaryHelmetValueUpdateSchemaType } from "../validation/updateSubsidiaryHelmetValue";

export { SubsidiaryHelmetValueUpdateForm };

interface SubsidiaryHelmetValueUpdateFormProps {
  form: UseFormReturn<SubsidiaryHelmetValueUpdateSchemaType>;
  dependencies: useSubsidiaryHelmetValueDependenciesReturn;
}

function SubsidiaryHelmetValueUpdateForm({
  form,
  dependencies,
}: SubsidiaryHelmetValueUpdateFormProps): React.ReactElement {
  const { t } = useTranslation();

  const [tire_model_id] = useWatch({
    control: form.control,
    name: ["tire_model_id"],
  });

  const variationQuery = useQuery({
    queryKey: ["variations", tire_model_id],
    queryFn: async () => {
      return await getVariations(
        new URLSearchParams({
          order: "DESC",
          scope:
            "tire_model_variation_id,tire_size.size,number_layers,status,approved",
        }),
        `${tire_model_id}`,
      );
    },
    keepPreviousData: true,
    enabled: `${tire_model_id}` !== "",
  });
  const variations = variationQuery.data ?? [];
  useProgressQuery(variationQuery, "variations");

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormAutoComplete
            {...modelsFilterProps}
            name="tire_model_id"
            options={dependencies.models}
            getOptionDisabled={(option) =>
              option.tire_model.status === 0 || option.tire_model.approved === 0
            }
            multiple={false}
            disabled={true}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...variationsFilterProps}
            options={variations}
            getOptionDisabled={(option) =>
              option.status === 0 || option.approved === 0
            }
            disabled={true}
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
