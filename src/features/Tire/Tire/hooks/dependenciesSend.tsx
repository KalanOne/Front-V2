import { useQuery } from "@tanstack/react-query";

import { useProgressQuery } from "src/hooks/progress.tsx";

import { getCompanies, getSubsidiaries, getWareHouses } from "../api/inputApi";
import {
  CompanyInput,
  SubsidiaryInput,
  WareHouseInput,
} from "../types/inputTypes";

export { useTireSendDependencies };
export type { UseTireSendDependenciesReturns };

interface UseTireSendDependenciesArgs {
  company_id?: string;
  subsidiary_id?: string;
}

interface UseTireSendDependenciesReturns {
  companies: CompanyInput[];
  subsidiaries: SubsidiaryInput[];
  wareHouses: WareHouseInput[];
}

function useTireSendDependencies({
  company_id = "",
  subsidiary_id = "",
}: UseTireSendDependenciesArgs): UseTireSendDependenciesReturns {
  const companiesQuery = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      return await getCompanies(
        new URLSearchParams({
          order: "DESC",
          scope: "company_id,name,status",
        }),
      );
    },
  });
  const companies = companiesQuery.data ?? [];
  useProgressQuery(companiesQuery, "companies");

  const subsidiariesQuery = useQuery({
    queryKey: ["subsidiaries", company_id],
    queryFn: async () => {
      return await getSubsidiaries(
        new URLSearchParams({
          order: "DESC",
          scope: "subsidiary_id,name,status",
          companies: company_id,
        }),
      );
    },
    enabled: company_id !== "",
  });
  const subsidiaries = subsidiariesQuery.data ?? [];
  useProgressQuery(subsidiariesQuery, "subsidiaries");

  const wareHousesQuery = useQuery({
    queryKey: ["wareHouses", subsidiary_id],
    queryFn: async () => {
      return await getWareHouses(
        new URLSearchParams({
          order: "DESC",
          scope: "warehouse_id,name,status",
          subsidiaries: subsidiary_id,
          with_where_has: "1",
        }),
      );
    },
    enabled: subsidiary_id !== "",
  });
  const wareHouses = wareHousesQuery.data ?? [];
  useProgressQuery(wareHousesQuery, "wareHouses");

  return {
    companies,
    subsidiaries,
    wareHouses,
  };
}
