import { useQuery } from "@tanstack/react-query";

import {
  getCompanies,
  getSubsidiaries,
} from "src/features/Report/Renewability/api/inputsApi";
import {
  CompanyInputResponse,
  SubsidiaryInputResponse,
} from "src/features/Report/Renewability/types/inputsTypes";
import { useProgressQuery } from "src/hooks/progress";

export { useMoveVehiclesDependencies };
export type { UseMoveVehiclesDependenciesArgsReturn };

interface UseMoveVehiclesDependenciesArgs {
  company?: string;
}

interface UseMoveVehiclesDependenciesArgsReturn {
  companies: CompanyInputResponse[];
  subsidiaries: SubsidiaryInputResponse[];
}

function useMoveVehiclesDependencies({
  company = "",
}: UseMoveVehiclesDependenciesArgs): UseMoveVehiclesDependenciesArgsReturn {
  const companiesQuery = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      return await getCompanies(
        new URLSearchParams({
          sort_by: "DESC",
          scope: "company_id,name,status",
        }),
      );
    },
  });
  const companies = companiesQuery.data ?? [];
  useProgressQuery(companiesQuery, "companies");

  const subsidiariesQuery = useQuery({
    queryKey: ["subsidiaries"],
    queryFn: async () => {
      return await getSubsidiaries(
        new URLSearchParams({
          sort_by: "DESC",
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
  };
}
