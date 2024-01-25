import { Update } from "node_modules/vite/types/hmrPayload";



import { http } from "src/api/api.ts";
import { CreateApiFunctionParams, DeleteApiFunctionParams, GetApiFunctionParams, IdApiExtras, PostApiFunctionParams, UpdateApiFunctionParams } from "src/types/api";
import { MessageResponse, PaginatedResponse } from "src/types/response";



import { OriginaModelResponse, OriginalModelApprovedData, OriginalModelCreateData, OriginalModelStatusData, OriginalModelUpdateData, OriginalModelUpdateDataComplete } from "../types/originalModelTypes";


export {
  getOriginalModels,
  createOriginalModel,
  updateOriginalModel,
  deleteOriginalModel,
  originalModelApproved,
  originalModelStatus,
};

async function getOriginalModels(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<OriginaModelResponse>> {
  return await http<PaginatedResponse<OriginaModelResponse>>({
    method: "GET",
    path: "tire/model/",
    params: params.params,
  });
}

async function createOriginalModel(
  params: CreateApiFunctionParams<OriginalModelCreateData>,
): Promise<OriginaModelResponse> {
  return await http<OriginaModelResponse>({
    method: "POST",
    path: `tire/model/`,
    data: params.data,
    dataWithFiles: true,
  });
}

async function updateOriginalModel(
  params: UpdateApiFunctionParams<
    OriginalModelUpdateData | OriginalModelUpdateDataComplete
  >,
): Promise<OriginaModelResponse> {
  return await http<OriginaModelResponse>({
    method: "POST",
    path: `tire/model/${params.id}`,
    data: params.data,
    dataWithFiles: true,
  });
}

async function deleteOriginalModel(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `tire/model/${params.id}`,
  });
}

async function originalModelApproved(
  params: PostApiFunctionParams<OriginalModelApprovedData>
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `tire/model/${params.id}/approved`,
    data: params.data,
  });
}

async function originalModelStatus(
  params: PostApiFunctionParams<OriginalModelStatusData>,
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `tire/model/${params.id}/status`,
    data: params.data,
  });
}