import { useQuery } from "@tanstack/react-query";

import { useProgressQuery } from "src/hooks/progress.tsx";

import {
  getDamages,
  getDrivers,
  getProviders,
  getRetirementCauses,
  getWears,
} from "../api/inputApi";
import {
  DamageInput,
  DriverInput,
  ProviderInput,
  RetirementCauseInput,
  WearInput,
} from "../types/inputTypes";

export { useButtonDependencies };
export type { UseButtonDependenciesReturns };
interface UseButtonDependenciesReturns {
  wears: WearInput[];
  damages: DamageInput[];
  providers: ProviderInput[];
  drivers: DriverInput[];
  retirementCauses: RetirementCauseInput[];
}

function useButtonDependencies(): UseButtonDependenciesReturns {
  const wearsQuery = useQuery({
    queryKey: ["wears"],
    queryFn: async () => {
      return await getWears(
        new URLSearchParams({
          order: "DESC",
          scope: "wear_id,name,status,frequency",
        }),
      );
    },
  });
  const wears = wearsQuery.data ?? [];
  useProgressQuery(wearsQuery, "wears");

  const damagesQuery = useQuery({
    queryKey: ["damages"],
    queryFn: async () => {
      return await getDamages(
        new URLSearchParams({
          order: "DESC",
          scope: "damage_id,name,status,frequency",
        }),
      );
    },
  });
  const damages = damagesQuery.data ?? [];
  useProgressQuery(damagesQuery, "damages");

  const providersQuery = useQuery({
    queryKey: ["providers"],
    queryFn: async () => {
      return await getProviders(
        new URLSearchParams({
          order: "DESC",
          scope: "provider_id,name,status,subsidiary.name",
        }),
      );
    },
  });
  const providers = providersQuery.data ?? [];
  useProgressQuery(providersQuery, "providers");

  const driversQuery = useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      return await getDrivers(
        new URLSearchParams({
          order: "DESC",
          scope: "driver_id,name,status",
        }),
      );
    },
  });
  const drivers = driversQuery.data ?? [];
  useProgressQuery(driversQuery, "drivers");

  const retirementCausesQuery = useQuery({
    queryKey: ["retirementCauses"],
    queryFn: async () => {
      return await getRetirementCauses(
        new URLSearchParams({
          order: "DESC",
          scope: "retirement_cause_id,name,status",
        }),
      );
    },
  });
  const retirementCauses = retirementCausesQuery.data ?? [];
  useProgressQuery(retirementCausesQuery, "retirementCauses");

  return {
    wears,
    damages,
    providers,
    drivers,
    retirementCauses,
  };
}
