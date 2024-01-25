import { useQuery } from "@tanstack/react-query";

import {
  getCompany,
  getCorporatesInput,
} from "src/features/Company/api/companyApi";
import { CompanyResponse } from "src/features/Company/types/companyTypes";
import { CorporateResponse } from "src/features/Corporate/types/corporateTypes";
import { useProgressQuery } from "src/hooks/progress.tsx";

export { useCompanyQueryDependencies };
export type { UseCorporateQueryDependenciesReturns };

interface useCompanyQueryDependenciesArgs {
  company_id?: string;
}

interface UseCorporateQueryDependenciesReturns {
  company: CompanyResponse | undefined;
  corporates: CorporateResponse[];
}

function useCompanyQueryDependencies({
  company_id,
}: useCompanyQueryDependenciesArgs): UseCorporateQueryDependenciesReturns {
  const companyQuery = useQuery({
    queryKey: ["company", company_id],
    queryFn: async () => {
      return await getCompany({
        id: company_id,
        params: {},
        extras: undefined,
      });
    },
    enabled: company_id !== "",
  });
  const company = companyQuery.data ?? undefined;
  useProgressQuery(companyQuery, "company");

  const corporatesQuery = useQuery({
    queryKey: ["corporates"],
    queryFn: async () => {
      return await getCorporatesInput({
        params: {
          scope: "corporate_id,name,status",
        },
        extras: undefined,
      });
    },
  });
  const corporates = corporatesQuery.data ?? [];
  useProgressQuery(corporatesQuery, "corporates");

  return {
    company,
    corporates,
  };
}
