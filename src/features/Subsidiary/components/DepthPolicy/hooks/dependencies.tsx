import { useQuery } from "@tanstack/react-query";

import { useProgressQuery } from "src/hooks/progress.tsx";

import { getData } from "../api/depthPolicy";

export { useDataDependencies };
export type { UseDataDependenciesReturns };

interface UseDataDependenciesArgs {
  subsidiary_id?: string;
  vehicle_id?: string;
  vehicle_depth_policy_id?: string;
}

interface UseDataDependenciesReturns {
  updateData: any;
}

function useDataDependencies({
  subsidiary_id = "",
  vehicle_id = "",
  vehicle_depth_policy_id = "",
}: UseDataDependenciesArgs): UseDataDependenciesReturns {
  const dataQuery = useQuery({
    queryKey: ["data", vehicle_id, vehicle_depth_policy_id],
    queryFn: async () => {
      return await getData({
        params: {
          subsidiary_id: subsidiary_id,
          vehicle_id: vehicle_id,
          vehicle_depth_policy_id: vehicle_depth_policy_id,
        },
        extras: undefined,
      });
    },
    enabled: vehicle_id !== "" && vehicle_depth_policy_id !== "",
  });
  const updateData = dataQuery.data ?? undefined;
  useProgressQuery(dataQuery, "data");

  return {
    updateData,
  };
}
