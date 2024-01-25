import { http } from "src/api/api.ts";
import {
  CreateApiFunctionParams,
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  IdApiExtras,
  PostApiFunctionParams,
  UpdateApiFunctionParams,
} from "src/types/api.ts";
import { MessageResponse, PaginatedResponse } from "src/types/response.ts";

import {
  SizeApprovedData,
  SizeCreateData,
  SizeResponse,
  SizeResponseInput,
  SizeStatusData,
  SizeUpdateData,
} from "../types/sizeTypes.ts";

export {
  getSizes,
  createSize,
  updateSize,
  deleteSize,
  sizeApproved,
  sizeStatus,
  getSizesInput,
};

async function getSizes(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<SizeResponse>> {
  return await http<PaginatedResponse<SizeResponse>>({
    method: "GET",
    path: "tire/size",
    params: params.params,
  });
}

async function createSize(
  params: CreateApiFunctionParams<SizeCreateData>,
): Promise<SizeResponse> {
  return await http<SizeResponse>({
    method: "POST",
    path: `tire/size/`,
    data: params.data,
  });
}

async function updateSize(
  params: UpdateApiFunctionParams<SizeUpdateData>,
): Promise<SizeResponse> {
  return await http<SizeResponse>({
    method: "PUT",
    path: `tire/size/${params.id}`,
    data: params.data,
  });
}

async function deleteSize(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `tire/size/${params.id}`,
  });
}

async function sizeApproved(params: PostApiFunctionParams<SizeApprovedData>) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `tire/size/${params.id}/approved`,
    data: params.data,
  });
}

async function sizeStatus(params: PostApiFunctionParams<SizeStatusData>) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `tire/size/${params.id}/status`,
    data: params.data,
  });
}

async function getSizesInput(
  params: GetApiFunctionParams,
): Promise<SizeResponseInput[]> {
  return await http<SizeResponseInput[]>({
    method: "GET",
    path: "tire/size",
    params: params.params,
  });
}
