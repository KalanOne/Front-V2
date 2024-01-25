import { useEffect, useState } from "react";

import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { getVehiclesTypes } from "src/features/Alerts/Mounting/api/inputsApi.ts";
import { VehicleTypeResponseInput } from "src/features/Alerts/Mounting/types/inputsTypes.ts";
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

export { useMountedTireDependencies };
export type { UseMountedTireDependenciesReturns };

interface UseMountedTireDependenciesArgs {
  corporate_id?: string | number;
  company?: number[];
}

interface UseMountedTireDependenciesReturns {
  corporates: CorporateInputResponse[];
  companies: CompanyInputResponse[];
  subsidiaries: SubsidiaryInputResponse[];
  vehiclesTypes: VehicleTypeResponseInput[];
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

function useMountedTireDependencies({
  corporate_id = "",
  company = [],
}: UseMountedTireDependenciesArgs): UseMountedTireDependenciesReturns {
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

  const typesQuery = useQuery({
    queryKey: ["vehiclesTypes"],
    queryFn: async () => {
      return await getVehiclesTypes(
        new URLSearchParams({
          sort_by: "DESC",
          scope: "vehicle_type_id,name,status",
        }),
      );
    },
  });
  const vehiclesTypes = typesQuery.data ?? [];
  useProgressQuery(typesQuery, "vehiclesTypes");

  const done = useQueriesDone([
    corporatesQuery,
    companiesQuery,
    subsidiariesQuery,
    typesQuery,
  ]);

  return {
    corporates,
    companies,
    subsidiaries,
    vehiclesTypes,
    done,
  };
}
