import { useQuery } from "@tanstack/react-query";

import { CompanyResponse } from "src/features/Company/types/companyTypes";
import { getCompaniesInput } from "src/features/Subsidiary/api/subsidiaryApi";
import { useProgressQuery } from "src/hooks/progress.tsx";

export { useDependencies };
export type { UseDependenciesReturns };

interface UseDependenciesReturns {
  companies: CompanyResponse[];
}

function useDependencies(): UseDependenciesReturns {
  const companiesQuery = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      return await getCompaniesInput({
        params: {
          scope: "company_id,name,status",
        },
        extras: undefined,
      });
    },
  });
  const companies = companiesQuery.data ?? [];
  useProgressQuery(companiesQuery, "companies");

  return {
    companies,
  };
}
