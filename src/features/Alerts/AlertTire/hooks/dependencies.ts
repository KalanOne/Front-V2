import { useQuery } from "@tanstack/react-query";

import {
  getProviders,
  getRevitalizedModels,
  getVehicles,
  getWarehouses,
} from "src/features/Alerts/AlertTire/api/inputsApi.ts";
import {
  ModelRevitalizedResponseInput,
  ProviderResponseInput,
  VehicleResponseInput,
  WarehouseResponseInput,
} from "src/features/Alerts/AlertTire/types/inputsTypes.ts";
import {
  getBrands,
  getModels,
  getSizes,
  getSubsidiaries,
} from "src/features/Report/Renewability/api/inputsApi.ts";
import {
  BrandResponseInput,
  ModelInputResponse,
  SizeResponseInput,
  SubsidiaryInputResponse,
} from "src/features/Report/Renewability/types/inputsTypes.ts";
import { useProgressQuery } from "src/hooks/progress.tsx";

export { useAlertTireDependencies };
export type { UseAlertDependenciesArgsReturn };

interface UseAlertTireDependenciesArgs {
  brand?: string[];
  brandRetread?: string;
}

interface UseAlertDependenciesArgsReturn {
  brands: BrandResponseInput[];
  models: ModelInputResponse[];
  brandsRetread: BrandResponseInput[];
  modelsRevitalized: ModelRevitalizedResponseInput[];
  sizes: SizeResponseInput[];
  providers: ProviderResponseInput[];
  subsidiaries: SubsidiaryInputResponse[];
  warehouses: WarehouseResponseInput[];
  vehicles: VehicleResponseInput[];
}

function useAlertTireDependencies({
  brand = [],
  brandRetread = "",
}: UseAlertTireDependenciesArgs): UseAlertDependenciesArgsReturn {
  const brandsQuery = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      return await getBrands(
        new URLSearchParams({
          order: "DESC",
          scope: "brand_id,name,status",
          brand_type: "TIRE",
        }),
      );
    },
  });
  const brands = brandsQuery.data ?? [];
  useProgressQuery(brandsQuery, "brands");

  const modelsQuery = useQuery({
    queryKey: ["models", brand.join(",").toString()],
    queryFn: async () => {
      return await getModels(
        new URLSearchParams({
          order: "DESC",
          scope:
            "tire_model_id,tire_model.name,tire_model.status,tire_model.approved",
          brands: brand.join(","),
        }),
      );
    },
    enabled: brand.length > 0,
  });
  const models = modelsQuery.data ?? [];
  useProgressQuery(modelsQuery, "models");

  const brandsQueryRetread = useQuery({
    queryKey: ["brandsRetread"],
    queryFn: async () => {
      return await getBrands(
        new URLSearchParams({
          order: "DESC",
          scope: "brand_id,name,status",
          brand_type: "RETREAD",
        }),
      );
    },
  });
  const brandsRetread = brandsQueryRetread.data ?? [];
  useProgressQuery(brandsQueryRetread, "brandsRetread");

  const modelsRevitalizedQuery = useQuery({
    queryKey: ["modelsRevitalized", brandRetread.toString()],
    queryFn: async () => {
      return await getRevitalizedModels(
        new URLSearchParams({
          order: "DESC",
          scope: "revitalized_tire_model_id,name,status",
          brands: brandRetread,
        }),
      );
    },
    enabled: brandRetread !== "",
  });
  const modelsRevitalized = modelsRevitalizedQuery.data ?? [];
  useProgressQuery(modelsRevitalizedQuery, "modelsRevitalized");

  const sizesQuery = useQuery({
    queryKey: ["sizes"],
    queryFn: async () => {
      return await getSizes(
        new URLSearchParams({
          order: "DESC",
          scope: "tire_size_id,size,status",
        }),
      );
    },
  });
  const sizes = sizesQuery.data ?? [];
  useProgressQuery(sizesQuery, "sizes");

  const providersQuery = useQuery({
    queryKey: ["providers"],
    queryFn: async () => {
      return await getProviders(
        new URLSearchParams({
          order: "DESC",
          scope: "provider_id,name,status",
        }),
      );
    },
  });
  const providers = providersQuery.data ?? [];
  useProgressQuery(providersQuery, "providers");

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

  const warehousesQuery = useQuery({
    queryKey: ["warehouses"],
    queryFn: async () => {
      return await getWarehouses(
        new URLSearchParams({
          order: "DESC",
          scope: "warehouse_id,name,status",
        }),
      );
    },
  });
  const warehouses = warehousesQuery.data ?? [];
  useProgressQuery(warehousesQuery, "warehouses");

  const vehiclesQuery = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      return await getVehicles(
        new URLSearchParams({
          order: "DESC",
          scope: "vehicle_id,economic_number,status",
        }),
      );
    },
  });
  const vehicles = vehiclesQuery.data ?? [];
  useProgressQuery(vehiclesQuery, "vehicles");

  return {
    brands,
    models,
    brandsRetread,
    modelsRevitalized,
    sizes,
    providers,
    subsidiaries,
    warehouses,
    vehicles,
  };
}
