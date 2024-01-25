import { useQuery } from "@tanstack/react-query";

import { useProgressQuery } from "src/hooks/progress.tsx";

import {
  getCompanies,
  getCorporates,
  getSubsidiaries,
} from "../../Renewability/api/inputsApi.ts";
import {
  CompanyInputResponse,
  CorporateInputResponse,
  SubsidiaryInputResponse,
} from "../../Renewability/types/inputsTypes.ts";

export { useBestPerformanceDependencies };
export type { UseBestPerformanceDependenciesReturns };

interface UseBestPerformanceDependenciesArgs {
  company?: string;
  corporate_id?: string;
}

interface UseBestPerformanceDependenciesReturns {
  companies: CompanyInputResponse[];
  subsidiaries: SubsidiaryInputResponse[];
  corporates: CorporateInputResponse[];
}

function useBestPerformanceDependencies({
  company = "",
  corporate_id = "",
}: UseBestPerformanceDependenciesArgs): UseBestPerformanceDependenciesReturns {
  const corporatesQuery = useQuery({
    queryKey: ["corporates"],
    queryFn: async () => {
      return await getCorporates(
        new URLSearchParams({
          sort_by: "DESC",
          scope: "corporate_id,name,status",
        }),
      );
    },
  });
  const corporates = corporatesQuery.data ?? [];
  useProgressQuery(corporatesQuery, "corporates");

  const companiesQuery = useQuery({
    queryKey: ["companies", corporate_id],
    queryFn: async () => {
      return await getCompanies(
        new URLSearchParams({
          order: "DESC",
          scope: "company_id,name,status",
          corporates: corporate_id,
        }),
      );
    },
    enabled: corporate_id !== "",
  });
  const companies = companiesQuery.data ?? [];
  useProgressQuery(companiesQuery, "companies");

  const subsidiariesQuery = useQuery({
    queryKey: ["subsidiaries", company],
    queryFn: async () => {
      return await getSubsidiaries(
        new URLSearchParams({
          order: "DESC",
          scope: "subsidiary_id,name,status",
          companies: company,
        }),
      );
    },
    enabled: company !== "",
  });
  const subsidiaries = subsidiariesQuery.data ?? [];
  useProgressQuery(subsidiariesQuery, "subsidiaries");

  return {
    companies,
    subsidiaries,
    corporates,
  };
}
