import { useQuery } from "@tanstack/react-query";

import {
  getDrivers,
  getVehiclesTypes,
} from "src/features/Alerts/Mounting/api/inputsApi";
import {
  DriverResponseInput,
  VehicleTypeResponseInput,
} from "src/features/Alerts/Mounting/types/inputsTypes";
import { getBrands } from "src/features/Alerts/Vehicle/api/inputsApi";
import { BrandResponseInput } from "src/features/Alerts/Vehicle/types/inputsTypes";
import { getSubsidiaries } from "src/features/Report/Renewability/api/inputsApi";
import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes";
import { useProgressQuery } from "src/hooks/progress";

export { useVehicleReviewDependencies };

export type { UseVehicleReviewDependenciesArgsReturn };

interface UseVehicleReviewDependenciesArgsReturn {
  subsidiaries: SubsidiaryInputResponse[];
  vehicleTypes: VehicleTypeResponseInput[];
  drivers: DriverResponseInput[];
  brands: BrandResponseInput[];
}

function useVehicleReviewDependencies(): UseVehicleReviewDependenciesArgsReturn {
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

  const typesQuery = useQuery({
    queryKey: ["vehicleTypes"],
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
  useProgressQuery(typesQuery, "vehicleTypes");

  const brandsQuery = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      return await getBrands(
        new URLSearchParams({
          sort_by: "DESC",
          scope: "brand_id,brand_type,name,status",
          brand_type: "TIRE,VEHICLE,VEHICLE_ENGINE,ENGINE_TRANSMISSION",
        }),
      );
    },
  });
  const brands = brandsQuery.data ?? [];
  useProgressQuery(brandsQuery, "brands");

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
    vehicleTypes,
    drivers,
    brands,
  };
}
