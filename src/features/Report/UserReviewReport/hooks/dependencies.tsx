import { useQuery } from "@tanstack/react-query";

import { useProgressQuery } from "src/hooks/progress.tsx";

import {
  getCompanies,
  getCorporates,
  getDivisions,
  getSubsidiaries,
  getUsers,
} from "../api/inputApis.ts";
import {
  CompanyInputResponse,
  CorporateInputResponse,
  DivisionResponseInput,
  SubsidiaryInputResponse,
  UserInputResponse,
} from "../types/inputTypes.ts";

export { useUserReviewDependencies };
export type { UseUserReviewDependenciesReturns };

interface UseUserReviewDependenciesArgs {
  corporate_id?: string;
  company?: string[];
}

interface UseUserReviewDependenciesReturns {
  corporates: CorporateInputResponse[];
  companies: CompanyInputResponse[];
  subsidiaries: SubsidiaryInputResponse[];
  divisions: DivisionResponseInput[];
  users: UserInputResponse[];
}

function useUserReviewDependencies({
  corporate_id = "",
  company = [],
}: UseUserReviewDependenciesArgs): UseUserReviewDependenciesReturns {
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

  const divisionQuery = useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      return await getDivisions(
        new URLSearchParams({
          order: "DESC",
          scope: "division_id,name,status",
        }),
      );
    },
  });
  const divisions = divisionQuery.data ?? [];
  useProgressQuery(divisionQuery, "divisions");

  const userQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUsers(
        new URLSearchParams({
          order: "DESC",
          scope: "user_id,name,last_name_1,last_name_2",
        }),
      );
    },
  });
  const users = userQuery.data ?? [];
  useProgressQuery(userQuery, "users");

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
          companies: company.toString(),
        }),
      );
    },
    enabled: company.length > 0,
  });
  const subsidiaries = subsidiariesQuery.data ?? [];
  useProgressQuery(subsidiariesQuery, "subsidiaries");

  return {
    corporates,
    divisions,
    users,
    companies,
    subsidiaries,
  };
}
