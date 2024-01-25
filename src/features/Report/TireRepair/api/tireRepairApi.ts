import { http } from "src/api/api.ts";

import {
  TireRepairGraphicsResponse,
  TireRepairResponse,
  TireRepairTableResponse,
} from "../types/tireRepairTypes";

export {
  getTireRepairProvider,
  getTireRepairProviderGraphics,
  getTireRepairProviderTable,
};

async function getTireRepairProvider(
  params?: any,
): Promise<TireRepairResponse> {
  return await http<TireRepairResponse>({
    method: "GET",
    path: "report/tire/repair",
    params: params,
  });
}

async function getTireRepairProviderGraphics(
  id: number,
  params?: any,
): Promise<TireRepairGraphicsResponse[]> {
  return await http<TireRepairGraphicsResponse[]>({
    method: "GET",
    path: `report/tire/repair/history/${id}`,
    params: params,
  });
}

async function getTireRepairProviderTable(
  id: number,
  params?: any,
): Promise<TireRepairTableResponse[]> {
  return await http<TireRepairTableResponse[]>({
    method: "GET",
    path: `report/tire/repair/details/${id}`,
    params: params,
  });
}
