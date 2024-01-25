import { useQuery } from "@tanstack/react-query";

import { useProgressQuery } from "src/hooks/progress.tsx";

import {
  getBrands,
  getProviders,
  getRevitalizedTireModels,
  getRfids,
  getSubsidiaries,
  getTireModelVariations,
  getTireModels,
  getWareHouses,
} from "../api/inputApi";
import {
  BrandInput,
  ProviderInput,
  RevitalizedTireModelInput,
  RfidInput,
  SubsidiaryInput,
  TireModelInput,
  VariationInput,
  WareHouseInput,
} from "../types/inputTypes";

export { useTireDependencies };
export type { UseTireDependenciesReturns };

interface UseTireDependenciesArgs {
  subsidiary_id?: string;
  tire_model_id?: string;
}

interface UseTireDependenciesReturns {
  subsidiaries: SubsidiaryInput[];
  brands: BrandInput[];
  tireModels: TireModelInput[];
  revitalizedTireModels: RevitalizedTireModelInput[];
  rfids: RfidInput[];
  providers: ProviderInput[];
  wareHouses: WareHouseInput[];
  tireModelVariations: VariationInput[];
}

function useTireDependencies({
  subsidiary_id = "",
  tire_model_id = "",
}: UseTireDependenciesArgs): UseTireDependenciesReturns {
  const subsidiariesQuery = useQuery({
    queryKey: ["subsidiaries"],
    queryFn: async () => {
      return await getSubsidiaries(
        new URLSearchParams({
          order: "DESC",
          scope: "subsidiary_id,name,status",
        }),
      );
    },
  });
  const subsidiaries = subsidiariesQuery.data ?? [];
  useProgressQuery(subsidiariesQuery, "subsidiaries");

  const brandsQuery = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      return await getBrands(
        new URLSearchParams({
          order: "DESC",
          scope: "brand_type,brand_id,name,status,approved",
          brand_type: "TIRE,RETREAD",
        }),
      );
    },
  });
  const brands = brandsQuery.data ?? [];
  useProgressQuery(brandsQuery, "brands");

  const tireModelsQuery = useQuery({
    queryKey: ["tireModels"],
    queryFn: async () => {
      return await getTireModels(
        new URLSearchParams({
          order: "DESC",
          scope:
            "tire_model_id,tire_model.brand_id,tire_model.name,tire_model.status,tire_model.approved",
        }),
      );
    },
  });
  const tireModelsData = tireModelsQuery.data ?? [];
  const tireModels = tireModelsData.reduce(
    // FIXME: This is a hack to remove duplicated tire models
    (result: TireModelInput[], model: TireModelInput) => {
      if (
        !result.find(
          (el: TireModelInput) => el.tire_model_id == model.tire_model_id,
        )
      ) {
        result.push(model);
      }
      return result;
    },
    [],
  );
  useProgressQuery(tireModelsQuery, "tireModels");

  const revitalizedTireModelsQuery = useQuery({
    queryKey: ["revitalizedTireModels"],
    queryFn: async () => {
      return await getRevitalizedTireModels(
        new URLSearchParams({
          order: "DESC",
          scope: "brand_id,revitalized_tire_model_id,name,status,approved",
        }),
      );
    },
  });
  const revitalizedTireModels = revitalizedTireModelsQuery.data ?? [];
  useProgressQuery(revitalizedTireModelsQuery, "revitalizedTireModels");

  const rfidsQuery = useQuery({
    queryKey: ["rfids"],
    queryFn: async () => {
      return await getRfids(
        new URLSearchParams({
          order: "DESC",
          scope: "rfid_id,device_code,status",
          with_link_tire: "0",
        }),
      );
    },
  });
  const rfids = rfidsQuery.data ?? [];
  useProgressQuery(rfidsQuery, "rfids");

  const providersQuery = useQuery({
    queryKey: ["providers", subsidiary_id],
    queryFn: async () => {
      return await getProviders(
        new URLSearchParams({
          order: "DESC",
          scope: "provider_id,name,status",
          subsidiaries: subsidiary_id,
        }),
      );
    },
    enabled: subsidiary_id !== "",
  });
  const providers = providersQuery.data ?? [];
  useProgressQuery(providersQuery, "providers");

  const wareHousesQuery = useQuery({
    queryKey: ["wareHouses", subsidiary_id],
    queryFn: async () => {
      return await getWareHouses(
        new URLSearchParams({
          order: "DESC",
          scope: "warehouse_id,name,status",
          subsidiaries: subsidiary_id,
        }),
      );
    },
    enabled: subsidiary_id !== "",
  });
  const wareHouses = wareHousesQuery.data ?? [];
  useProgressQuery(wareHousesQuery, "wareHouses");

  const tireModelVariationsQuery = useQuery({
    queryKey: ["tireModelVariations", tire_model_id],
    queryFn: async () => {
      return await getTireModelVariations(
        tire_model_id,
        new URLSearchParams({
          order: "DESC",
          scope:
            "tire_model_variation_id,tire_size.size,number_layers,status,approved",
        }),
      );
    },
    enabled: tire_model_id !== "",
  });
  const tireModelVariations = tireModelVariationsQuery.data ?? [];
  useProgressQuery(tireModelVariationsQuery, "tireModelVariations");

  return {
    subsidiaries,
    brands,
    tireModels,
    revitalizedTireModels,
    rfids,
    providers,
    wareHouses,
    tireModelVariations,
  };
}
