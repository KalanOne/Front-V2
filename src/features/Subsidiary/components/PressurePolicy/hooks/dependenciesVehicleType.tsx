import { useQuery } from "@tanstack/react-query";

import { useProgressQuery } from "src/hooks/progress.tsx";

import { getVehicleType } from "../api/pressureApi";

export { useVehicleTypeDependencies };
export type { UseVehicleTypeDependenciesReturns };

interface UseVehicleTypeDependenciesReturns {
  vehicleType: any;
}

function useVehicleTypeDependencies(): UseVehicleTypeDependenciesReturns {
  const vehicleTypeQuery = useQuery({
    queryKey: ["vehicleType"],
    queryFn: async () => {
      return await getVehicleType({
        params: {
          order: "DESC",
          scope: "vehicle_type_id,name,status",
        },
        extras: undefined,
      });
    },
  });
  const vehicleType = vehicleTypeQuery.data ?? undefined;
  useProgressQuery(vehicleTypeQuery, "vehicleType");

  return {
    vehicleType,
  };
}
