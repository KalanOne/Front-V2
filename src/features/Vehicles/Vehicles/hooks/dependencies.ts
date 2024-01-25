import { useQuery } from "@tanstack/react-query";

import {
  getDrivers,
  getVehiclesTypes,
} from "src/features/Alerts/Mounting/api/inputsApi";
import {
  DriverResponseInput,
  VehicleTypeResponseInput,
} from "src/features/Alerts/Mounting/types/inputsTypes";
import { getSubsidiaries } from "src/features/Report/Renewability/api/inputsApi.ts";
import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes.ts";
import { useProgressQuery } from "src/hooks/progress.tsx";

import { getBrands, getDivisions } from "../api/inputsApi";
import {
  BrandResponseInput,
  DivisionResponseInput,
} from "../types/inputsTypes";

export { useVehiclesDependencies };
export type { UseVehiclesDependenciesArgsReturn };

interface UseVehiclesDependenciesArgs {
  subsidiary?: string[];
}

interface UseVehiclesDependenciesArgsReturn {
  subsidiaries: SubsidiaryInputResponse[];
  divisions: DivisionResponseInput[];
  vehicleTypes: VehicleTypeResponseInput[];
  drivers: DriverResponseInput[];
  brands: BrandResponseInput[];
}

function useVehiclesDependencies({
  subsidiary = [],
}: UseVehiclesDependenciesArgs): UseVehiclesDependenciesArgsReturn {
  const brandsQuery = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      return await getBrands(
        new URLSearchParams({
          sort_by: "DESC",
          scope: "brand_type,brand_id,name,status,approved",
          brand_type: "VEHICLE,VEHICLE_ENGINE,ENGINE_TRANSMISSION",
        }),
      );
    },
  });
  const brands = brandsQuery.data ?? [];
  useProgressQuery(brandsQuery, "brands");

  const subsidiariesQuery = useQuery({
    queryKey: ["subsidiaries"],
    queryFn: async () => {
      return await getSubsidiaries(
        new URLSearchParams({
          sort_by: "DESC",
          scope: "subsidiary_id,name,status",
        }),
      );
    },
  });
  const subsidiaries = subsidiariesQuery.data ?? [];
  useProgressQuery(subsidiariesQuery, "subsidiaries");

  const divisionsQuery = useQuery({
    queryKey: ["divisions", subsidiary],
    queryFn: async () => {
      return await getDivisions(
        new URLSearchParams({
          sort_by: "DESC",
          scope: "division_id,name,status,subsidiary.name",
          subsidiaries: subsidiary.join(","),
        }),
      );
    },
    enabled: subsidiary.length > 0,
  });
  const divisions = divisionsQuery.data ?? [];
  useProgressQuery(divisionsQuery, "divisions");

  const typesQuery = useQuery({
    queryKey: ["vehiclesTypes"],
    queryFn: async () => {
      return await getVehiclesTypes(
        new URLSearchParams({
          sort_by: "DESC",
          scope: "vehicle_type_id,name,status",
        }),
      );
    },
  });
  const vehicleTypes = typesQuery.data ?? [];
  useProgressQuery(typesQuery, "vehiclesTypes");

  const driversQuery = useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      return await getDrivers(
        new URLSearchParams({
          sort_by: "DESC",
          scope: "driver_id,name,status",
        }),
      );
    },
  });
  const drivers = driversQuery.data ?? [];
  useProgressQuery(driversQuery, "drivers");

  return {
    subsidiaries,
    divisions,
    vehicleTypes,
    drivers,
    brands,
  };
}
