import { http } from "src/api/api.ts";

import {
  BrandResponseInput,
  DriverResponseInput,
  VehicleTypeResponseInput,
} from "../types/inputsTypes.ts";

export { getBrands, getVehiclesTypes, getDrivers };

async function getBrands(params?: any): Promise<BrandResponseInput[]> {
  return await http<BrandResponseInput[]>({
    method: "GET",
    path: "brand",
    params: params,
  });
}

async function getVehiclesTypes(
  params?: any,
): Promise<VehicleTypeResponseInput[]> {
  return await http<VehicleTypeResponseInput[]>({
    method: "GET",
    path: "vehicle/type",
    params: params,
  });
}

async function getDrivers(params?: any): Promise<DriverResponseInput[]> {
  return await http<DriverResponseInput[]>({
    method: "GET",
    path: "driver",
    params: params,
  });
}

// async function getVehicles(params?: any): Promise<VehicleResponseInput[]> {
//   return await http<VehicleResponseInput[]>({
//     method: "GET",
//     path: "vehicles",
//     params: params,
//   });
// }
