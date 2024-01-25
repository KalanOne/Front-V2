import { Grid } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";

import {
  modelsFilterProps,
  variationsFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { useProgressQuery } from "src/hooks/progress";

import { getVariations } from "../api/inputsApi";
import { useSubsidiaryHelmetValueDependenciesReturn } from "../hooks/dependencies";
import { SubsidiaryHelmetValueFilterSchemaType } from "../validation/filterSubsidiaryHelmetValue";

export { SubsidiaryHelmetValueFilterForm };

interface SubsidiaryHelmetValueFilterFormProps {
  form: UseFormReturn<SubsidiaryHelmetValueFilterSchemaType>;
  dependencies: useSubsidiaryHelmetValueDependenciesReturn;
}

function SubsidiaryHelmetValueFilterForm({
  form,
  dependencies,
}: SubsidiaryHelmetValueFilterFormProps): React.ReactElement {
  const [tire_model] = useWatch({
    control: form.control,
    name: ["tire_model"],
  });

  const variationQuery = useQuery({
    queryKey: ["variations", tire_model],
    queryFn: async () => {
      return await getVariations(
        new URLSearchParams({
          order: "DESC",
          scope:
            "tire_model_variation_id,tire_size.size,number_layers,status,approved",
        }),
        `${tire_model}`,
      );
    },
    keepPreviousData: true,
    enabled: `${tire_model}` !== "",
  });
  const variations = variationQuery.data ?? [];
  useProgressQuery(variationQuery, "variations");

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormAutoComplete
            {...modelsFilterProps}
            name="tire_model"
            options={dependencies.models}
            getOptionDisabled={(option) =>
              option.tire_model.status === 0 || option.tire_model.approved === 0
            }
            multiple={false}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...variationsFilterProps}
            name="tire_model_variation"
            options={variations}
            getOptionDisabled={(option) =>
              option.status === 0 || option.approved === 0
            }
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
