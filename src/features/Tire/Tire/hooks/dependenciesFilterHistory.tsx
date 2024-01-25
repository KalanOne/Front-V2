import { useQuery } from "@tanstack/react-query";
import { use } from "i18next";

import { useProgressQuery } from "src/hooks/progress.tsx";

import {
  getProviders,
  getSubsidiaries,
  getVehicles,
  getWareHouses,
} from "../api/inputApi";
import {
  ProviderInput,
  SubsidiaryInput,
  WareHouseInput,
} from "../types/inputTypes";

export { useFilterHistoryDependencies };
export type { UseFilterHistoryDependenciesReturns };

interface UseFilterHistoryDependenciesReturns {
  providers: ProviderInput[];
  wareHouses: WareHouseInput[];
  vehicles: any[];
}

function useFilterHistoryDependencies(): UseFilterHistoryDependenciesReturns {
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

  const wareHousesQuery = useQuery({
    queryKey: ["wareHouses"],
    queryFn: async () => {
      return await getWareHouses(
        new URLSearchParams({
          order: "DESC",
          scope: "warehouse_id,name,status",
        }),
      );
    },
  });
  const wareHouses = wareHousesQuery.data ?? [];
  useProgressQuery(wareHousesQuery, "wareHouses");

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
    providers,
    wareHouses,
    vehicles,
  };
}
