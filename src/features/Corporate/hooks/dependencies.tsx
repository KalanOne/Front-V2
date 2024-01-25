import { useQuery } from "@tanstack/react-query";

import { useProgressQuery } from "src/hooks/progress.tsx";

import { getCorporate } from "../api/corporateApi";
import { CorporateResponse } from "../types/corporateTypes";

export { useCorporateQueryDependencies };
export type { UseCorporateQueryDependenciesReturns };

interface useCorporateQueryDependenciesArgs {
  corporate_id?: string;
}

interface UseCorporateQueryDependenciesReturns {
  corporate: CorporateResponse | undefined;
}

function useCorporateQueryDependencies({
  corporate_id,
}: useCorporateQueryDependenciesArgs): UseCorporateQueryDependenciesReturns {
  const corporateQuery = useQuery({
    queryKey: ["corporate", corporate_id],
    queryFn: async () => {
      return await getCorporate({
        id: corporate_id,
        params: {},
        extras: undefined,
      });
    },
    enabled: corporate_id !== "",
  });
  const corporate = corporateQuery.data ?? undefined;
  useProgressQuery(corporateQuery, "corporate");

  return {
    corporate,
  };
}
