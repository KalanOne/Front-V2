import { Update } from "node_modules/vite/types/hmrPayload";

import { http } from "src/api/api";
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
  RfidCreateData,
  RfidLinkData,
  RfidResponse,
  RfidStatusData,
  RfidUpdateData,
} from "../types/rfidTypes";

export {
  getRfid,
  createRfid,
  updateRfid,
  deleteRfid,
  rfidStatus,
  getTires,
  linkRfid,
  unLinkRfid,
};

async function getRfid(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<RfidResponse>> {
  return await http<PaginatedResponse<RfidResponse>>({
    method: "GET",
    path: "rfid",
    params: params.params,
  });
}

async function createRfid(
  params: CreateApiFunctionParams<RfidCreateData>,
): Promise<RfidResponse> {
  return await http<RfidResponse>({
    method: "POST",
    path: `rfid`,
    data: params.data,
  });
}

async function updateRfid(
  params: UpdateApiFunctionParams<RfidUpdateData>,
): Promise<RfidResponse> {
  return await http<RfidResponse>({
    method: "PUT",
    path: `rfid/${params.id}`,
    data: params.data,
  });
}

async function deleteRfid(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `rfid/${params.id}`,
  });
}

async function rfidStatus(params: PostApiFunctionParams<RfidStatusData>) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `rfid/${params.id}/status`,
    data: params.data,
  });
}

async function linkRfid(
  params: PostApiFunctionParams<RfidLinkData>,
): Promise<RfidResponse> {
  return await http<RfidResponse>({
    method: "POST",
    path: `rfid/${params.data.rfid_id}/tire/${params.data.tire_id}`,
  });
}

async function unLinkRfid(
  params: PostApiFunctionParams<RfidLinkData>,
): Promise<RfidResponse> {
  return await http<RfidResponse>({
    method: "DELETE",
    path: `rfid/${params.data.rfid_id}/tire/${params.data.tire_id}`,
  });
}

async function getTires(params: GetApiFunctionParams): Promise<any[]> {
  return await http<any>({
    method: "GET",
    path: "tire",
    params: params.params,
  });
}
