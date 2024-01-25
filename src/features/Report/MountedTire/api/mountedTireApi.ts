import { http } from "src/api/api.ts";

import {
  MountedTireGraphicsResponse,
  MountedTireResponse,
  MountedTireTableResponse,
} from "../types/mountedTireTypes";

export {
  getMountedTireVehicle,
  getMountedTireVehicleGraphics,
  getMountedTireVehicleTable,
};

async function getMountedTireVehicle(
  params?: any,
): Promise<MountedTireResponse> {
  return await http<MountedTireResponse>({
    method: "GET",
    path: "report/mount/summary",
    params: params,
  });
}

async function getMountedTireVehicleGraphics(
  id: number,
  params?: any,
): Promise<MountedTireGraphicsResponse[]> {
  return await http<MountedTireGraphicsResponse[]>({
    method: "GET",
    path: `report/mount/summary/history/${id}`,
    params: params,
  });
}

async function getMountedTireVehicleTable(
  id: number,
  params?: any,
): Promise<MountedTireTableResponse[]> {
  return await http<MountedTireTableResponse[]>({
    method: "GET",
    path: `report/mount/summary/${id}`,
    params: params,
  });
}
