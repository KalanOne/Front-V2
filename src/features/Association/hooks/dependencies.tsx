import { useQuery } from "@tanstack/react-query";

import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes";
import { getSubsidiariesInput } from "src/features/Subsidiary/api/subsidiaryApi";
import { useProgressQuery } from "src/hooks/progress.tsx";

export { useDependencies };
export type { UseDependenciesReturns };

interface UseDependenciesReturns {
  subsidiaries: SubsidiaryInputResponse[];
}

function useDependencies(): UseDependenciesReturns {
  const subsidiariesQuery = useQuery({
    queryKey: ["subsidiaries"],
    queryFn: async () => {
      return await getSubsidiariesInput({
        params: {
          sort_by: "DESC",
          scope: "subsidiary_id,name,status",
        },
        extras: undefined,
      });
    },
  });
  const subsidiaries = subsidiariesQuery.data ?? [];
  useProgressQuery(subsidiariesQuery, "subsidiaries");

  return {
    subsidiaries,
  };
}
