import { useQuery } from "@tanstack/react-query";

import { useProgressQuery } from "src/hooks/progress.tsx";

import { getAssociations } from "../api/commissionedDriverApi";
import { AssociationResponse } from "../types/commissionedDriverTypes";

export { useDependencies };
export type { UseDependenciesReturns };

interface UseDependenciesReturns {
  associations: AssociationResponse[];
}

function useDependencies(): UseDependenciesReturns {
  const associationsQuery = useQuery({
    queryKey: ["associations"],
    queryFn: async () => {
      return await getAssociations({
        params: {
          order: "DESC",
          scope: "association_id,name,status",
        },
        extras: undefined,
      });
    },
  });
  const associations = associationsQuery.data ?? [];
  useProgressQuery(associationsQuery, "associations");

  return {
    associations,
  };
}
