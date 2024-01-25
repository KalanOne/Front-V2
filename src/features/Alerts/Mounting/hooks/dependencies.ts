import { useQuery } from "@tanstack/react-query";

import { getVehicles } from "src/features/Alerts/AlertTire/api/inputsApi.ts";
import { VehicleResponseInput } from "src/features/Alerts/AlertTire/types/inputsTypes.ts";
import { useProgressQuery } from "src/hooks/progress.tsx";

import { getBrands, getDrivers, getVehiclesTypes } from "../api/inputsApi.ts";
import {
  BrandResponseInput,
  DriverResponseInput,
  VehicleTypeResponseInput,
} from "../types/inputsTypes.ts";

export { useAlertMountingDependencies };
export type { UseAlertMountingDependenciesArgsReturn };

interface UseAlertMountingDependenciesArgsReturn {
  brands: BrandResponseInput[];
  vehiclesTypes: VehicleTypeResponseInput[];
  vehicles: VehicleResponseInput[];
  drivers: DriverResponseInput[];
}

function useAlertMountingDependencies(): UseAlertMountingDependenciesArgsReturn {
  const brandsQuery = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      return await getBrands(
        new URLSearchParams({
          sort_by: "DESC",
          scope: "brand_type,brand_id,name,status",
          brand_type: "VEHICLE",
        }),
      );
    },
  });
  const brands = brandsQuery.data ?? [];
  useProgressQuery(brandsQuery, "brands");

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
  const vehiclesTypes = typesQuery.data ?? [];
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

  const vehiclesQuery = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      return await getVehicles(
        new URLSearchParams({
          sort_by: "DESC",
          scope: "vehicle_id,economic_number,status",
        }),
      );
    },
  });
  const vehicles = vehiclesQuery.data ?? [];
  useProgressQuery(vehiclesQuery, "vehicles");

  return {
    brands,
    vehiclesTypes,
    vehicles,
    drivers,
  };
}
