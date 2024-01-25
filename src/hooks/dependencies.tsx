import { useEffect, useState } from "react";

import { UseQueryResult, useQuery } from "@tanstack/react-query";

import {
  getProviders,
  getRevitalizedModels,
  getVehicles,
  getWarehouses,
} from "src/features/Alerts/AlertTire/api/inputsApi";
import { getDrivers } from "src/features/Alerts/Vehicle/api/inputsApi";
import { getAlerts } from "src/features/AlertsPanel/api/inputsApi";
import { getVariations } from "src/features/Areas/SubsidiaryHelmetValue/api/inputsApi";
import { getAssociations } from "src/features/Commissioned/api/commissionedDriverApi";
import { getCorporatesInput } from "src/features/Company/api/companyApi";
import {
  getBrands,
  getModels,
  getSizes,
  getSubsidiaries,
} from "src/features/Report/Renewability/api/inputsApi";
import { getVehicleType } from "src/features/Subsidiary/components/DepthPolicy/api/depthPolicy";
import { getCompanies } from "src/features/Tire/Tire/api/inputApi";
import { getDivisions } from "src/features/Vehicles/Vehicles/api/inputsApi";
import { useProgressQuery } from "src/hooks/progress.tsx";

export { useFilterDependencies };

export type { UseFilterDependenciesReturn };

interface UseFilterDependenciesFilterValues {
  corporate_id?: string | number;
  brands?: number[];
  brandRetread?: string | number;
  company_id?: string | number;
  subsidiary_id?: string | number;
  models?: number[];
  subsidiaries?: number[];
}

interface UseFilterDependenciesObject {
  name: string;
  scope?: string;
  params?: Record<string, unknown>;
}

type UseFilterDependenciesElement = string | UseFilterDependenciesObject;

interface UseFilterDependenciesReturn {
  brands?: any;
  models?: any;
  variations?: any;
  brandsRetread?: any;
  modelsRevitalized?: any;
  sizes?: any;
  providers?: any;
  vehicles?: any;
  corporates?: any;
  companies?: any;
  subsidiaries?: any;
  divisions?: any;
  warehouses?: any;
  associations?: any;
  vehicleType?: any;
  drivers?: any;
  alerts?: any;
  done?: boolean;
}

function hasKey(
  key: string,
  elements: UseFilterDependenciesElement[],
): boolean {
  return elements.some((e) => {
    if (typeof e === "string") {
      return e === key;
    }
    return e.name === key;
  });
}

function getKey(
  key: string,
  elements: UseFilterDependenciesElement[],
): UseFilterDependenciesObject | string {
  const element = elements.find((e) => {
    if (typeof e === "string") {
      return e === key;
    }
    return e.name === key;
  });
  return element ?? "";
}

function getScope(
  element: UseFilterDependenciesElement,
  defaultValue: string,
): string {
  if (typeof element === "string") {
    return defaultValue;
  }
  return element.scope ?? defaultValue;
}

function getAdditionalParams(element: UseFilterDependenciesElement) {
  if (typeof element === "string") {
    return {};
  }
  return element.params ?? {};
}

function useQueriesDone(queries: UseQueryResult<unknown>[]): boolean {
  const [done, setDone] = useState(false);

  const allQueriesDone = queries.every((query) => query.isSuccess);

  useEffect(() => {
    if (allQueriesDone) {
      setDone(true);
    }
  }, [allQueriesDone]);

  return done;
}

function useFilterDependencies(
  elements: UseFilterDependenciesElement[],
  filterValues: UseFilterDependenciesFilterValues,
  querysDone: string[] = [],
): UseFilterDependenciesReturn {
  let dependencies = {};
  const querysArray = [];

  if (hasKey("brands", elements)) {
    const brandsElement = getKey("brands", elements);
    const brandsQuery = useQuery({
      queryKey: ["brands"],
      queryFn: async () => {
        return await getBrands(
          new URLSearchParams({
            order: "DESC",
            scope: getScope(brandsElement, "brand_id,name,status"),
            brand_type: "TIRE",
            ...getAdditionalParams(brandsElement),
          }),
        );
      },
    });
    const brands = brandsQuery.data ?? [];
    useProgressQuery(brandsQuery, "brands");
    dependencies = { ...dependencies, brands };
    if (querysDone.includes("brands")) {
      querysArray.push(brandsQuery);
    }
  }

  if (hasKey("models", elements)) {
    const modelsElement = getKey("models", elements);
    if (hasKey("brands", elements)) {
      const modelsQuery = useQuery({
        queryKey: ["models", filterValues.brands?.toString()],
        queryFn: async () => {
          return await getModels(
            new URLSearchParams({
              order: "DESC",
              scope: getScope(
                modelsElement,
                "tire_model_id,tire_model.name,tire_model.status,tire_model.approved",
              ),
              ...(filterValues.brands &&
              filterValues.brands.length > 0 &&
              filterValues.brands.join(",") !== ""
                ? { brands: filterValues.brands.join(",") }
                : {}),
              ...getAdditionalParams(modelsElement),
            }),
          );
        },
        enabled:
          filterValues.brands && filterValues.brands.join(",") !== ""
            ? filterValues.brands.length > 0
            : false,
      });
      const models = modelsQuery.data ?? [];
      useProgressQuery(modelsQuery, "models");
      dependencies = { ...dependencies, models };
      if (querysDone.includes("models")) {
        querysArray.push(modelsQuery);
      }
    } else {
      const modelsQuery = useQuery({
        queryKey: ["models"],
        queryFn: async () => {
          return await getModels(
            new URLSearchParams({
              order: "DESC",
              scope: getScope(
                modelsElement,
                "tire_model_id,tire_model.name,tire_model.status,tire_model.approved",
              ),
              ...getAdditionalParams(modelsElement),
            }),
          );
        },
      });
      const models = modelsQuery.data ?? [];
      useProgressQuery(modelsQuery, "models");
      dependencies = { ...dependencies, models };
      if (querysDone.includes("models")) {
        querysArray.push(modelsQuery);
      }
    }
  }

  if (hasKey("variations", elements)) {
    const variationsElement = getKey("variations", elements);
    if (hasKey("models", elements)) {
      const variationQuery = useQuery({
        queryKey: ["variations", filterValues.models?.toString()],
        queryFn: async () => {
          return await getVariations(
            new URLSearchParams({
              order: "DESC",
              scope: getScope(
                variationsElement,
                "tire_model_variation_id,tire_size.size,number_layers,status,approved",
              ),
              ...getAdditionalParams(variationsElement),
            }),
            filterValues.models ? filterValues.models?.toString() : "",
          );
        },
        keepPreviousData: true,
        enabled: filterValues.models?.toString() !== "",
      });
      const variations = variationQuery.data ?? [];
      useProgressQuery(variationQuery, "variations");
      dependencies = { ...dependencies, variations };
      if (querysDone.includes("variations")) {
        querysArray.push(variationQuery);
      }
    }
  }

  if (hasKey("brandsRetread", elements)) {
    const brandsRetreadElement = getKey("brandsRetread", elements);
    const brandsQueryRetread = useQuery({
      queryKey: ["brandsRetread"],
      queryFn: async () => {
        return await getBrands(
          new URLSearchParams({
            order: "DESC",
            scope: getScope(brandsRetreadElement, "brand_id,name,status"),
            brand_type: "RETREAD",
            ...getAdditionalParams(brandsRetreadElement),
          }),
        );
      },
    });
    const brandsRetread = brandsQueryRetread.data ?? [];
    useProgressQuery(brandsQueryRetread, "brandsRetread");
    dependencies = { ...dependencies, brandsRetread };
    if (querysDone.includes("brandsRetread")) {
      querysArray.push(brandsQueryRetread);
    }
  }

  if (hasKey("modelsRevitalized", elements)) {
    const modelsRevitalizedElement = getKey("models", elements);
    if (hasKey("brandsRetread", elements)) {
      const modelsRevitalizedQuery = useQuery({
        queryKey: ["modelsRevitalized", filterValues.brandRetread?.toString()],
        queryFn: async () => {
          return await getRevitalizedModels(
            new URLSearchParams({
              order: "DESC",
              scope: getScope(
                modelsRevitalizedElement,
                "revitalized_tire_model_id,name,status",
              ),
              ...(filterValues.brandRetread
                ? { brands: filterValues.brandRetread.toString() }
                : {}),
              ...getAdditionalParams(modelsRevitalizedElement),
            }),
          );
        },
        enabled: filterValues.brandRetread !== "",
      });
      const modelsRevitalized = modelsRevitalizedQuery.data ?? [];
      useProgressQuery(modelsRevitalizedQuery, "modelsRevitalized");
      dependencies = { ...dependencies, modelsRevitalized };
      if (querysDone.includes("modelsRevitalized")) {
        querysArray.push(modelsRevitalizedQuery);
      }
    }
  }

  if (hasKey("sizes", elements)) {
    const sizesElement = getKey("sizes", elements);
    const sizesQuery = useQuery({
      queryKey: ["sizes"],
      queryFn: async () => {
        return await getSizes(
          new URLSearchParams({
            order: "DESC",
            scope: getScope(sizesElement, "tire_size_id,size,status"),
            ...getAdditionalParams(sizesElement),
          }),
        );
      },
    });
    const sizes = sizesQuery.data ?? [];
    useProgressQuery(sizesQuery, "sizes");
    dependencies = { ...dependencies, sizes };
    if (querysDone.includes("sizes")) {
      querysArray.push(sizesQuery);
    }
  }

  if (hasKey("providers", elements)) {
    const providersElement = getKey("providers", elements);
    const providersQuery = useQuery({
      queryKey: ["providers"],
      queryFn: async () => {
        return await getProviders(
          new URLSearchParams({
            order: "DESC",
            scope: getScope(providersElement, "provider_id,name,status"),
            ...getAdditionalParams(providersElement),
          }),
        );
      },
    });
    const providers = providersQuery.data ?? [];
    useProgressQuery(providersQuery, "providers");
    dependencies = { ...dependencies, providers };
    if (querysDone.includes("providers")) {
      querysArray.push(providersQuery);
    }
  }

  if (hasKey("vehicles", elements)) {
    const vehiclesElement = getKey("vehicles", elements);
    const vehiclesQuery = useQuery({
      queryKey: ["vehicles"],
      queryFn: async () => {
        return await getVehicles(
          new URLSearchParams({
            order: "DESC",
            scope: getScope(
              vehiclesElement,
              "vehicle_id,economic_number,status",
            ),
            ...getAdditionalParams(vehiclesElement),
          }),
        );
      },
    });
    const vehicles = vehiclesQuery.data ?? [];
    useProgressQuery(vehiclesQuery, "vehicles");
    dependencies = { ...dependencies, vehicles };
    if (querysDone.includes("vehicles")) {
      querysArray.push(vehiclesQuery);
    }
  }

  if (hasKey("corporates", elements)) {
    const corporatesElement = getKey("corporates", elements);
    const corporatesQuery = useQuery({
      queryKey: ["corporates"],
      queryFn: async () => {
        return await getCorporatesInput({
          params: {
            scope: getScope(corporatesElement, "corporate_id,name,status"),
            ...getAdditionalParams(corporatesElement),
          },
          extras: undefined,
        });
      },
    });
    const corporates = corporatesQuery.data ?? [];
    useProgressQuery(corporatesQuery, "corporates");
    dependencies = { ...dependencies, corporates };
    if (querysDone.includes("corporates")) {
      querysArray.push(corporatesQuery);
    }
  }

  if (hasKey("companies", elements)) {
    const companiesElement = getKey("companies", elements);
    const companiesQuery = useQuery({
      queryKey: ["companies"],
      queryFn: async () => {
        return await getCompanies(
          new URLSearchParams({
            order: "DESC",
            scope: getScope(companiesElement, "company_id,name,status"),
            ...getAdditionalParams(companiesElement),
          }),
        );
      },
    });
    const companies = companiesQuery.data ?? [];
    useProgressQuery(companiesQuery, "companies");
    dependencies = { ...dependencies, companies };
    if (querysDone.includes("companies")) {
      querysArray.push(companiesQuery);
    }
  }

  if (hasKey("subsidiaries", elements)) {
    const subsidiariesElement = getKey("subsidiaries", elements);
    if (hasKey("companies", elements)) {
      const subsidiariesQuery = useQuery({
        queryKey: ["subsidiaries", filterValues.company_id?.toString()],
        queryFn: async () => {
          return await getSubsidiaries(
            new URLSearchParams({
              order: "DESC",
              scope: getScope(subsidiariesElement, "subsidiary_id,name,status"),
              companies: filterValues.company_id
                ? filterValues.company_id?.toString()
                : "",
            }),
          );
        },
        enabled: filterValues.company_id?.toString() !== "",
      });
      const subsidiaries = subsidiariesQuery.data ?? [];
      useProgressQuery(subsidiariesQuery, "subsidiaries");
      dependencies = { ...dependencies, subsidiaries };
      if (querysDone.includes("subsidiaries")) {
        querysArray.push(subsidiariesQuery);
      }
    } else {
      const subsidiariesQuery = useQuery({
        queryKey: ["subsidiaries"],
        queryFn: async () => {
          return await getSubsidiaries(
            new URLSearchParams({
              order: "DESC",
              scope: getScope(subsidiariesElement, "subsidiary_id,name,status"),
              ...getAdditionalParams(subsidiariesElement),
            }),
          );
        },
      });
      const subsidiaries = subsidiariesQuery.data ?? [];
      useProgressQuery(subsidiariesQuery, "subsidiaries");
      dependencies = { ...dependencies, subsidiaries };
      if (querysDone.includes("subsidiaries")) {
        querysArray.push(subsidiariesQuery);
      }
    }
  }

  if (hasKey("divisions", elements)) {
    const divisionsElement = getKey("divisions", elements);
    if (hasKey("subsidiaries", elements)) {
      const divisionsQuery = useQuery({
        queryKey: ["divisions", filterValues.subsidiaries?.toString()],
        queryFn: async () => {
          return await getDivisions(
            new URLSearchParams({
              sort_by: "DESC",
              scope: getScope(
                divisionsElement,
                "division_id,name,status,subsidiary.name",
              ),
              subsidiaries: filterValues.subsidiaries
                ? filterValues.subsidiaries?.toString()
                : "",
              ...getAdditionalParams(divisionsElement),
            }),
          );
        },
        enabled: filterValues.subsidiaries
          ? filterValues.subsidiaries.length > 0
          : false,
      });
      const divisions = divisionsQuery.data ?? [];
      useProgressQuery(divisionsQuery, "divisions");
      dependencies = { ...dependencies, divisions };
      if (querysDone.includes("divisions")) {
        querysArray.push(divisionsQuery);
      }
    }
  }

  if (hasKey("warehouses", elements)) {
    const warehousesElement = getKey("warehouses", elements);
    if (hasKey("subsidiaries", elements)) {
      const wareHousesQuery = useQuery({
        queryKey: ["wareHouses", filterValues.subsidiary_id?.toString()],
        queryFn: async () => {
          return await getWarehouses(
            new URLSearchParams({
              order: "DESC",
              scope: "warehouse_id,name,status",
              subsidiaries: filterValues.subsidiary_id
                ? filterValues.subsidiary_id?.toString()
                : "",
              ...getAdditionalParams(warehousesElement),
            }),
          );
        },
        enabled: filterValues.subsidiary_id?.toString() !== "",
      });
      const warehouses = wareHousesQuery.data ?? [];
      useProgressQuery(wareHousesQuery, "wareHouses");
      dependencies = { ...dependencies, warehouses };
      if (querysDone.includes("wareHouses")) {
        querysArray.push(wareHousesQuery);
      }
    } else {
      const warehousesQuery = useQuery({
        queryKey: ["warehouses"],
        queryFn: async () => {
          return await getWarehouses(
            new URLSearchParams({
              order: "DESC",
              scope: getScope(warehousesElement, "warehouse_id,name,status"),
              ...getAdditionalParams(warehousesElement),
            }),
          );
        },
      });
      const warehouses = warehousesQuery.data ?? [];
      useProgressQuery(warehousesQuery, "warehouses");
      dependencies = { ...dependencies, warehouses };
      if (querysDone.includes("warehouses")) {
        querysArray.push(warehousesQuery);
      }
    }
  }

  if (hasKey("associations", elements)) {
    const associationsElement = getKey("associations", elements);
    const associationsQuery = useQuery({
      queryKey: ["associations"],
      queryFn: async () => {
        return await getAssociations({
          params: {
            order: "DESC",
            scope: getScope(associationsElement, "association_id,name,status"),
            ...getAdditionalParams(associationsElement),
          },
          extras: undefined,
        });
      },
    });
    const associations = associationsQuery.data ?? [];
    useProgressQuery(associationsQuery, "associations");
    dependencies = { ...dependencies, associations };
    if (querysDone.includes("associations")) {
      querysArray.push(associationsQuery);
    }
  }

  if (hasKey("vehicleType", elements)) {
    const vehicleTypeElement = getKey("vehicleType", elements);
    const vehicleTypeQuery = useQuery({
      queryKey: ["vehicleType"],
      queryFn: async () => {
        return await getVehicleType({
          params: {
            order: "DESC",
            scope: getScope(vehicleTypeElement, "vehicle_type_id,name,status"),
            ...getAdditionalParams(vehicleTypeElement),
          },
          extras: undefined,
        });
      },
    });
    const vehicleType = vehicleTypeQuery.data ?? [];
    useProgressQuery(vehicleTypeQuery, "vehicleType");
    dependencies = { ...dependencies, vehicleType };
    if (querysDone.includes("vehicleType")) {
      querysArray.push(vehicleTypeQuery);
    }
  }

  if (hasKey("drivers", elements)) {
    const driversElement = getKey("drivers", elements);
    const driversQuery = useQuery({
      queryKey: ["drivers"],
      queryFn: async () => {
        return await getDrivers(
          new URLSearchParams({
            sort_by: "DESC",
            scope: getScope(driversElement, "driver_id,name,status"),
            ...getAdditionalParams(driversElement),
          }),
        );
      },
    });
    const drivers = driversQuery.data ?? [];
    useProgressQuery(driversQuery, "drivers");
    dependencies = { ...dependencies, drivers };
    if (querysDone.includes("drivers")) {
      querysArray.push(driversQuery);
    }
  }

  if (hasKey("alerts", elements)) {
    const alertsElement = getKey("alerts", elements);
    const alertsQuery = useQuery({
      queryKey: ["alerts"],
      queryFn: async () => {
        return await getAlerts(
          new URLSearchParams({
            sort_by: "DESC",
            scope: getScope(
              alertsElement,
              "alert_id,code,colloquial_name,status",
            ),
            ...getAdditionalParams(alertsElement),
          }),
        );
      },
    });
    const alerts = alertsQuery.data ?? [];
    useProgressQuery(alertsQuery, "alerts");
    dependencies = { ...dependencies, alerts };
    if (querysDone.includes("alerts")) {
      querysArray.push(alertsQuery);
    }
  }

  const done = useQueriesDone(querysArray);
  dependencies = { ...dependencies, done };
  return dependencies;
}
