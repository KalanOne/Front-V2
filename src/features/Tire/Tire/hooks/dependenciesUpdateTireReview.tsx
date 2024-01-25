import { useQuery } from "@tanstack/react-query";

import { useProgressQuery } from "src/hooks/progress.tsx";

import { getReview } from "../api/buttonsApi";
import { getWareHouses } from "../api/inputApi";
import { ReviewInput, WareHouseInput } from "../types/inputTypes";

export { useUpdateTireReviewDependencies };
export type { UseUpdateTireReviewDependenciesReturns };

interface UseUpdateTireReviewDependenciesArgs {
  movement_tire_id?: string;
}

interface UseUpdateTireReviewDependenciesReturns {
  review?: ReviewInput;
}

function useUpdateTireReviewDependencies({
  movement_tire_id = "",
}: UseUpdateTireReviewDependenciesArgs): UseUpdateTireReviewDependenciesReturns {
  const reviewQuery = useQuery({
    queryKey: ["review", movement_tire_id],
    queryFn: async () => {
      return await getReview(movement_tire_id);
    },
    enabled: movement_tire_id !== "",
  });
  const review = reviewQuery.data ?? undefined;
  useProgressQuery(reviewQuery, "review");

  return {
    review,
  };
}
