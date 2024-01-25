import { useQuery } from "@tanstack/react-query";

import { getBrandsInput } from "src/features/Brand/api/brandApi";
import { BrandResponseInput } from "src/features/Brand/types/brandTypes";
import { useProgressQuery } from "src/hooks/progress.tsx";

import { getSizesInput } from "../../Size/api/sizeApi";
import { SizeResponseInput } from "../../Size/types/sizeTypes";

export { useDependencies };
export type { UseBrandsQueryDependenciesReturns };

interface UseBrandsQueryDependenciesReturns {
  brands: BrandResponseInput[];
  sizes: SizeResponseInput[];
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

  const sizesQuery = useQuery({
    queryKey: ["sizes"],
    queryFn: async () => {
      return await getSizesInput({
        params: {
          order: "DESC",
          scope: "tire_size_id,size,status,approved",
        },
        extras: undefined,
      });
    },
  });
  const sizes = sizesQuery.data ?? [];
  useProgressQuery(sizesQuery, "sizes");

  return {
    brands,
    sizes,
  };
}
