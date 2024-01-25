import { useEffect, useState } from "react";

import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { getProviders } from "src/features/Tire/Tire/api/inputApi.ts";
import { ProviderInput } from "src/features/Tire/Tire/types/inputTypes.ts";
import { useProgressQuery } from "src/hooks/progress.tsx";

import {
  getCompanies,
  getCorporates,
  getSubsidiaries,
} from "../../UserReviewReport/api/inputApis.ts";
import {
  CompanyInputResponse,
  CorporateInputResponse,
  SubsidiaryInputResponse,
} from "../../UserReviewReport/types/inputTypes.ts";

export { useTireRepairDependencies };
export type { UseTireRepairDependenciesReturns };

interface UseTireRepairDependenciesArgs {
  corporate_id?: string | number;
  company?: number[];
  subsidiary?: number[];
}

interface UseTireRepairDependenciesReturns {
  corporates: CorporateInputResponse[];
  companies: CompanyInputResponse[];
  subsidiaries: SubsidiaryInputResponse[];
  providers: ProviderInput[];
  done: boolean;
}

function useQueriesDone(queries: UseQueryResult<unknown>[]): boolean {
  const [done, setDone] = useState(false);

  const allQueriesDone = queries.every((query) => query.isSuccess);

  useEffect(() => {
    if (allQueriesDone) {
      setDone(true);
    }
  }, [allQueriesDone]);

  return done;
}

function useTireRepairDependencies({
  corporate_id = "",
  company = [],
  subsidiary = [],
}: UseTireRepairDependenciesArgs): UseTireRepairDependenciesReturns {
  const corporatesQuery = useQuery({
    queryKey: ["corporates"],
    queryFn: async () => {
      return await getCorporates(
        new URLSearchParams({
          order: "DESC",
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
          corporates: `${corporate_id}`,
        }),
      );
    },
    enabled: corporate_id !== "",
    keepPreviousData: true,
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
          companies: company.toString(),
        }),
      );
    },
    keepPreviousData: true,
    enabled: company.length > 0,
  });
  const subsidiaries = subsidiariesQuery.data ?? [];
  useProgressQuery(subsidiariesQuery, "subsidiaries");

  const providersQuery = useQuery({
    queryKey: ["providers", subsidiary],
    queryFn: async () => {
      return await getProviders(
        new URLSearchParams({
          order: "DESC",
          scope: "provider_id,name,status,subsidiary.name",
          subsidiaries: subsidiary.toString(),
        }),
      );
    },
    enabled: subsidiary.length > 0,
  });
  const providers = providersQuery.data ?? [];
  useProgressQuery(providersQuery, "providers");

  const done = useQueriesDone([
    corporatesQuery,
    companiesQuery,
    subsidiariesQuery,
    providersQuery,
  ]);

  return {
    corporates,
    companies,
    subsidiaries,
    providers,
    done,
  };
}
