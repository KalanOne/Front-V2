import { useQuery } from "@tanstack/react-query";

import { useProgressQuery } from "src/hooks/progress.tsx";

import {
  getBrands,
  getCompanies,
  getCorporates,
  getModels,
  getSizes,
  getSubsidiaries,
} from "../api/inputsApi.ts";
import {
  BrandResponseInput,
  CompanyInputResponse,
  CorporateInputResponse,
  ModelInputResponse,
  SizeResponseInput,
  SubsidiaryInputResponse,
} from "../types/inputsTypes.ts";

export { useRenewabilityDependencies };
export type { UseRenewabilityDependenciesReturns };

interface UseRenewabilityDependenciesArgs {
  corporate_id?: string;
  company?: string;
  brand?: string;
}

interface UseRenewabilityDependenciesReturns {
  sizes: SizeResponseInput[];
  corporates: CorporateInputResponse[];
  brands: BrandResponseInput[];
  companies: CompanyInputResponse[];
  subsidiaries: SubsidiaryInputResponse[];
  models: ModelInputResponse[];
}

function useRenewabilityDependencies({
  corporate_id = "",
  company = "",
  brand = "",
}: UseRenewabilityDependenciesArgs): UseRenewabilityDependenciesReturns {
  const sizesQuery = useQuery({
    queryKey: ["sizes"],
    queryFn: async () => {
      return await getSizes(
        new URLSearchParams({
          sort_by: "DESC",
          scope: "tire_size_id,size,status",
        }),
      );
    },
  });
  const sizes = sizesQuery.data ?? [];
  useProgressQuery(sizesQuery, "sizes");

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

  const brandsQuery = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      return await getBrands(
        new URLSearchParams({
          sort_by: "DESC",
          scope: "brand_id,name,status",
          brand_type: "TIRE",
        }),
      );
    },
  });
  const brands = brandsQuery.data ?? [];
  useProgressQuery(brandsQuery, "brands");

  const companiesQuery = useQuery({
    queryKey: ["companies", corporate_id],
    queryFn: async () => {
      return await getCompanies(
        new URLSearchParams({
          sort_by: "DESC",
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

  const modelsQuery = useQuery({
    queryKey: ["models", brand],
    queryFn: async () => {
      return await getModels(
        new URLSearchParams({
          sort_by: "DESC",
          scope:
            "tire_model_id,tire_model.name,tire_model.status,tire_model.approved",
          brands: brand,
        }),
      );
    },
    enabled: brand !== "",
  });
  const models = modelsQuery.data ?? [];
  useProgressQuery(modelsQuery, "models");

  return {
    sizes,
    corporates,
    brands,
    companies,
    subsidiaries,
    models,
  };
}
