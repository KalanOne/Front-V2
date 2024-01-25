import { http } from "src/api/api.ts";

import {
  TireRetreadGraphicsResponse,
  TireRetreadResponse,
  TireRetreadTableResponse,
} from "../types/tireRetreadTypes";

export {
  getTireRetreadProvider,
  getTireRetreadProviderGraphics,
  getTireRetreadProviderTable,
};

async function getTireRetreadProvider(
  params?: any,
): Promise<TireRetreadResponse> {
  return await http<TireRetreadResponse>({
    method: "GET",
    path: "report/tire/revitalized",
    params: params,
  });
}

async function getTireRetreadProviderGraphics(
  id: number,
  params?: any,
): Promise<TireRetreadGraphicsResponse[]> {
  return await http<TireRetreadGraphicsResponse[]>({
    method: "GET",
    path: `report/tire/revitalized/history/${id}`,
    params: params,
  });
}

async function getTireRetreadProviderTable(
  id: number,
  params?: any,
): Promise<TireRetreadTableResponse[]> {
  return await http<TireRetreadTableResponse[]>({
    method: "GET",
    path: `report/tire/revitalized/details/${id}`,
    params: params,
  });
}
