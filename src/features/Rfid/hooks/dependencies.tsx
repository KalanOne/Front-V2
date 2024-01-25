import { useQuery } from "@tanstack/react-query";

import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes";
import { getSubsidiariesInput } from "src/features/Subsidiary/api/subsidiaryApi";
import { useProgressQuery } from "src/hooks/progress.tsx";

import { getTires } from "../api/rfidApi";

export { useDependencies };
export type { UseDependenciesReturns };

interface UseDependenciesReturns {
  subsidiaries: SubsidiaryInputResponse[];
  tires: any[];
}

function useDependencies(): UseDependenciesReturns {
  const subsidiariesQuery = useQuery({
    queryKey: ["subsidiaries"],
    queryFn: async () => {
      return await getSubsidiariesInput({
        params: {
          scope: "subsidiary_id,name,status",
        },
        extras: undefined,
      });
    },
  });
  const subsidiaries = subsidiariesQuery.data ?? [];
  useProgressQuery(subsidiariesQuery, "subsidiaries");

  const tiresQuery = useQuery({
    queryKey: ["tires"],
    queryFn: async () => {
      return await getTires({
        params: {
          with_link_rfid: "0",
          scope: "tire_id,code,status",
          order: "DESC",
        },
        extras: undefined,
      });
    },
  });
  const tires = tiresQuery.data ?? [];
  useProgressQuery(tiresQuery, "tires");

  return {
    subsidiaries,
    tires,
  };
}
