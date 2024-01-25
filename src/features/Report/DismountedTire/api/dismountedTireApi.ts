import { http } from "src/api/api.ts";

import {
  DismountedTireGraphicsResponse,
  DismountedTireResponse,
  DismountedTireTableResponse,
} from "../types/dismountedTireTypes";

export {
  getDismountedTireWarehouse,
  getDismountedTireWarehouseGraphics,
  getDismountedTireWarehouseTable,
};

async function getDismountedTireWarehouse(
  params?: any,
): Promise<DismountedTireResponse> {
  return await http<DismountedTireResponse>({
    method: "GET",
    path: "report/warehouse/summary",
    params: params,
  });
}

async function getDismountedTireWarehouseGraphics(
  id: number,
  params?: any,
): Promise<DismountedTireGraphicsResponse[]> {
  return await http<DismountedTireGraphicsResponse[]>({
    method: "GET",
    path: `report/warehouse/summary/history/${id}`,
    params: params,
  });
}

async function getDismountedTireWarehouseTable(
  id: number,
  params?: any,
): Promise<DismountedTireTableResponse[]> {
  return await http<DismountedTireTableResponse[]>({
    method: "GET",
    path: `report/warehouse/summary/${id}`,
    params: params,
  });
}
