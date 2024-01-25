import { useQuery } from "@tanstack/react-query";

import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes";
import { getSubsidiariesInput } from "src/features/Subsidiary/api/subsidiaryApi";
import { useProgressQuery } from "src/hooks/progress.tsx";

import { getVehiclesInput } from "../api/gpsApi";
import { VehicleLinkResponse } from "../types/gpsTypes";

export { useDependencies };
export type { UseDependenciesReturns };

interface UseDependenciesReturns {
  subsidiaries: SubsidiaryInputResponse[];
  vehicles: VehicleLinkResponse[];
}

function useDependencies(): UseDependenciesReturns {
  const subsidiariesQuery = useQuery({
    queryKey: ["subsidiaries"],
    queryFn: async () => {
      return await getSubsidiariesInput({
        params: {
          scope: "subsidiary_id,name,status",
        },
        extras: undefined,
      });
    },
  });
  const subsidiaries = subsidiariesQuery.data ?? [];
  useProgressQuery(subsidiariesQuery, "subsidiaries");

  const vehiclesQuery = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      return await getVehiclesInput({
        params: {
          scope: "vehicle_id,economic_number,status",
          order: "DESC",
        },
        extras: undefined,
      });
    },
  });
  const vehicles = vehiclesQuery.data ?? [];
  useProgressQuery(vehiclesQuery, "vehicles");

  return {
    subsidiaries,
    vehicles,
  };
}
