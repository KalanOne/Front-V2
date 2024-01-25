import { http } from "src/api/api.ts";
import {
  CreateApiFunctionParams,
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  IdApiExtras,
  PostApiFunctionParams,
  UpdateApiFunctionParams,
} from "src/types/api";
import { MessageResponse, PaginatedResponse } from "src/types/response";

import {
  AlertCreateData,
  AlertResponse,
  AlertStatusData,
  AlertUpdateData,
} from "../types/alertTypes";

export { getAlerts, createAlert, updateAlert, deleteAlert, alertStatus };

async function getAlerts(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<AlertResponse>> {
  return await http<PaginatedResponse<AlertResponse>>({
    method: "GET",
    path: "alert",
    params: params.params,
  });
}

async function createAlert(
  params: CreateApiFunctionParams<AlertCreateData>,
): Promise<AlertResponse> {
  return await http<AlertResponse>({
    method: "POST",
    path: `alert`,
    data: params.data,
  });
}

async function updateAlert(
  params: UpdateApiFunctionParams<AlertUpdateData>,
): Promise<AlertResponse> {
  return await http<AlertResponse>({
    method: "PUT",
    path: `alert/${params.id}`,
    data: params.data,
  });
}

async function deleteAlert(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `alert/${params.id}`,
  });
}

async function alertStatus(params: PostApiFunctionParams<AlertStatusData>) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `alert/${params.id}/status`,
    data: params.data,
  });
}
