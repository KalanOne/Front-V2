import { useQuery } from "@tanstack/react-query";

import { useProgressQuery } from "src/hooks/progress.tsx";

import { getDrivers, getWareHouses } from "../api/inputApi";
import { DriverInput, WareHouseInput } from "../types/inputTypes";

export { useWareHouseDependencies };
export type { UseWareHouseDependenciesReturns };

interface UseWareHouseDependenciesReturns {
  warehouses?: WareHouseInput[];
  drivers?: DriverInput[];
}

function useWareHouseDependencies(): UseWareHouseDependenciesReturns {
  const warehousesQuery = useQuery({
    queryKey: ["warehouses"],
    queryFn: async () => {
      return await getWareHouses(
        new URLSearchParams({
          order: "DESC",
          scope: "warehouse_id,name,status,subsidiary.name",
        }),
      );
    },
  });
  const warehouses = warehousesQuery.data ?? [];
  useProgressQuery(warehousesQuery, "warehouses");

  const driversQuery = useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      return await getDrivers(
        new URLSearchParams({
          order: "DESC",
          scope: "driver_id,name,status",
        }),
      );
    },
  });
  const drivers = driversQuery.data ?? [];
  useProgressQuery(driversQuery, "drivers");

  return {
    warehouses,
    drivers,
  };
}
