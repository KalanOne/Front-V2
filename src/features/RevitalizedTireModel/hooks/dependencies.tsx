import { useQuery } from "@tanstack/react-query";

import { getBrandsInput } from "src/features/Brand/api/brandApi";
import { BrandResponseInput } from "src/features/Brand/types/brandTypes";
import { useProgressQuery } from "src/hooks/progress.tsx";

export { useDependencies };
export type { UseBrandsQueryDependenciesReturns };

interface UseBrandsQueryDependenciesReturns {
  brands: BrandResponseInput[];
}

function useDependencies(): UseBrandsQueryDependenciesReturns {
  const brandsQuery = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      return await getBrandsInput({
        params: {
          order: "DESC",
          scope: "brand_id,name,status,approved",
          brand_type: "TIRE",
        },
        extras: undefined,
      });
    },
  });
  const brands = brandsQuery.data ?? [];
  useProgressQuery(brandsQuery, "brands");

  return {
    brands,
  };
}
