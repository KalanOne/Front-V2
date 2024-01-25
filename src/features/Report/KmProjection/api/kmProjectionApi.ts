import { http } from "src/api/api";

import { KmProjectionResponse } from "../types/kmProjectionTypes";

export { getKmProjection, getKmProjectionDetail };

async function getKmProjection(params?: any): Promise<KmProjectionResponse> {
  return await http<KmProjectionResponse>({
    method: "GET",
    path: "report/km/projection",
    params: params,
  });
}

async function getKmProjectionDetail(
  params?: any,
): Promise<KmProjectionResponse> {
  return await http<KmProjectionResponse>({
    method: "GET",
    path: "report/km/projection/details",
    params: params,
  });
}
