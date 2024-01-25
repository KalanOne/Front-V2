import { http } from "src/api/api.ts";
import {
  CreateApiFunctionParams,
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  IdApiExtras,
  UpdateApiFunctionParams,
} from "src/types/api";
import { MessageResponse, PaginatedResponse } from "src/types/response.ts";

import {
  TireCreateData,
  TireResponse,
  TireUpdateData,
} from "../types/tireTypes";

export { getTires, deleteTire, createTire, updateTire, getTire };

async function getTires(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<TireResponse>> {
  return await http<PaginatedResponse<TireResponse>>({
    method: "GET",
    path: "tire",
    params: params.params,
  });
}

async function createTire(
  params: CreateApiFunctionParams<TireCreateData>,
): Promise<TireResponse> {
  return await http<TireResponse>({
    method: "POST",
    path: `tire`,
    data: params.data,
  });
}

async function updateTire(
  params: UpdateApiFunctionParams<TireUpdateData>,
): Promise<TireResponse> {
  return await http<TireResponse>({
    method: "PUT",
    path: `tire/${params.id}`,
    data: params.data,
  });
}

async function deleteTire(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `tire/${params.id}`,
  });
}

async function getTire(extras: IdApiExtras): Promise<TireResponse> {
  return await http<TireResponse>({
    method: "GET",
    path: `tire/${extras.id}`,
  });
}
