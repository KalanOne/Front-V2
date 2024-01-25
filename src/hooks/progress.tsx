import { useEffect } from "react";

import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { useProgress } from "src/stores/general/progress.ts";

export { useProgressQuery, useProgressMutation };

function useProgressQuery(query: UseQueryResult, id: string) {
  const addProgress = useProgress((state) => state.addProgress);
  const removeProgress = useProgress((state) => state.removeProgress);

  useEffect(() => {
    if (query.isFetching) {
      addProgress(id);
    } else {
      removeProgress(id);
    }
  }, [query.isFetching]);
}

function useProgressMutation(
  mutation: UseMutationResult<any, any, any, any>,
  id: string,
) {
  const addProgress = useProgress((state) => state.addProgress);
  const removeProgress = useProgress((state) => state.removeProgress);

  useEffect(() => {
    if (mutation.isLoading) {
      addProgress(id);
    } else {
      removeProgress(id);
    }
  }, [mutation.isLoading]);
}
