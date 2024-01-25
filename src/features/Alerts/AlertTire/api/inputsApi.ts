import { http } from "src/api/api.ts";

import {
  ModelRevitalizedResponseInput,
  ProviderResponseInput,
  VehicleResponseInput,
  WarehouseResponseInput,
} from "../types/inputsTypes.ts";

export { getProviders, getWarehouses, getVehicles, getRevitalizedModels };

async function getProviders(params?: any): Promise<ProviderResponseInput[]> {
  return await http<ProviderResponseInput[]>({
    method: "GET",
    path: "provider",
    params: params,
  });
}

async function getWarehouses(params?: any): Promise<WarehouseResponseInput[]> {
  return await http<WarehouseResponseInput[]>({
    method: "GET",
    path: "warehouse",
    params: params,
  });
}

async function getVehicles(params?: any): Promise<VehicleResponseInput[]> {
  return await http<VehicleResponseInput[]>({
    method: "GET",
    path: "vehicle",
    params: params,
  });
}

async function getRevitalizedModels(
  params?: any,
): Promise<ModelRevitalizedResponseInput[]> {
  return await http<ModelRevitalizedResponseInput[]>({
    method: "GET",
    path: "revitalized/tire/model",
    params: params,
  });
}
