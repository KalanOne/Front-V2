import { useQuery } from "@tanstack/react-query";

import { useProgressQuery } from "src/hooks/progress.tsx";

import {
  getBrands,
  getRevitalizedTireModels2,
  getRfids,
  getWareHouses,
} from "../api/inputApi";
import {
  BrandInput,
  RevitalizedTireModelInput2,
  RfidInput,
  WareHouseInput,
} from "../types/inputTypes";

export { useTireRevitalizedDependencies };
export type { UseTireRevitalizedDependenciesReturns };

interface UseTireRevitalizedDependenciesArgs {
  brand_id?: string;
}

interface UseTireRevitalizedDependenciesReturns {
  brands: BrandInput[];
  revitalizedTireModels: RevitalizedTireModelInput2[];
  rfids: RfidInput[];
  wareHouses: WareHouseInput[];
}

function useTireRevitalizedDependencies({
  brand_id = "",
}: UseTireRevitalizedDependenciesArgs): UseTireRevitalizedDependenciesReturns {
  const brandsQuery = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      return await getBrands(
        new URLSearchParams({
          order: "DESC",
          scope: "brand_id,name,status,approved",
          brand_type: "RETREAD",
        }),
      );
    },
  });
  const brands = brandsQuery.data ?? [];
  useProgressQuery(brandsQuery, "brands");

  const revitalizedTireModelsQuery = useQuery({
    queryKey: ["revitalizedTireModels", brand_id],
    queryFn: async () => {
      return await getRevitalizedTireModels2(
        new URLSearchParams({
          order: "DESC",
          scope: "revitalized_tire_model_id,name,status,depth,approved",
          brands: brand_id.toString(),
        }),
      );
    },
    enabled: brand_id !== "",
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
        }),
      );
    },
  });
  const rfids = rfidsQuery.data ?? [];
  useProgressQuery(rfidsQuery, "rfids");

  const wareHousesQuery = useQuery({
    queryKey: ["wareHouses"],
    queryFn: async () => {
      return await getWareHouses(
        new URLSearchParams({
          order: "DESC",
          scope: "warehouse_id,name,status,subsidiary.name",
        }),
      );
    },
  });
  const wareHouses = wareHousesQuery.data ?? [];
  useProgressQuery(wareHousesQuery, "wareHouses");

  return {
    brands,
    revitalizedTireModels,
    rfids,
    wareHouses,
  };
}
