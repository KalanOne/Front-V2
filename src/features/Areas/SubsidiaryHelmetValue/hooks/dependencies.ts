import { useQuery } from "@tanstack/react-query";

import { getModels } from "src/features/Report/Renewability/api/inputsApi";
import { ModelInputResponse } from "src/features/Report/Renewability/types/inputsTypes";
import { useProgressQuery } from "src/hooks/progress";

import { getVariations } from "../api/inputsApi";
import { VariationInputResponse } from "../types/inputsTypes";

export { useSubsidiaryHelmetValueDependencies };
export type { useSubsidiaryHelmetValueDependenciesReturn };

interface useSubsidiaryHelmetValueDependenciesArgs {
  model?: string;
}

interface useSubsidiaryHelmetValueDependenciesReturn {
  models: ModelInputResponse[];
  variations: VariationInputResponse[];
}

function useSubsidiaryHelmetValueDependencies({
  model = "",
}: useSubsidiaryHelmetValueDependenciesArgs): useSubsidiaryHelmetValueDependenciesReturn {
  const modelsQuery = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      return await getModels(
        new URLSearchParams({
          order: "DESC",
          scope:
            "tire_model_id,tire_model.brand_id,tire_model.name,tire_model.status,tire_model.approved",
        }),
      );
    },
    keepPreviousData: true,
  });
  const models = modelsQuery.data ?? [];
  useProgressQuery(modelsQuery, "models");

  const variationQuery = useQuery({
    queryKey: ["variations", model],
    queryFn: async () => {
      return await getVariations(
        new URLSearchParams({
          order: "DESC",
          scope:
            "tire_model_variation_id,tire_size.size,number_layers,status,approved",
        }),
        model,
      );
    },
    keepPreviousData: true,
    enabled: model !== "",
  });
  const variations = variationQuery.data ?? [];
  useProgressQuery(variationQuery, "variations");

  return {
    models,
    variations,
  } as useSubsidiaryHelmetValueDependenciesReturn;
}
