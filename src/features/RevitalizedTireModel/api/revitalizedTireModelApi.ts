import { http } from "src/api/api.ts";
import { CreateApiFunctionParams, DeleteApiFunctionParams, GetApiFunctionParams, IdApiExtras, PostApiFunctionParams, UpdateApiFunctionParams } from "src/types/api.ts";
import { MessageResponse, PaginatedResponse } from "src/types/response.ts";



import { RevitalizedTireModelApprovedData, RevitalizedTireModelCreateData, RevitalizedTireModelResponse, RevitalizedTireModelStatusData, RevitalizedTireModelUpdateData } from "../types/revitalizedTireModelTypes.ts";


export {
  getRevitalizedTireModel,
  createRevitalizedTireModel,
  updateRevitalizedTireModel,
  deleteRevitalizedTireModel,
  revitalizedTireModelApproved,
  revitalizedTireModelStatus,
};

async function getRevitalizedTireModel(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<RevitalizedTireModelResponse>> {
  return await http<PaginatedResponse<RevitalizedTireModelResponse>>({
    method: "GET",
    path: "revitalized/tire/model",
    params: params.params,
  });
}

async function createRevitalizedTireModel(
  params: CreateApiFunctionParams<RevitalizedTireModelCreateData>,
): Promise<RevitalizedTireModelResponse> {
  return await http<RevitalizedTireModelResponse>({
    method: "POST",
    path: `revitalized/tire/model`,
    data: params.data,
  });
}

async function updateRevitalizedTireModel(
  params: UpdateApiFunctionParams<RevitalizedTireModelUpdateData>,
): Promise<RevitalizedTireModelResponse> {
  return await http<RevitalizedTireModelResponse>({
    method: "PUT",
    path: `revitalized/tire/model/${params.id}`,
    data: params.data,
  });
}

async function deleteRevitalizedTireModel(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `revitalized/tire/model/${params.id}`,
  });
}

async function revitalizedTireModelApproved(
  params: PostApiFunctionParams<RevitalizedTireModelApprovedData>,
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `revitalized/tire/model/${params.id}/approved`,
    data: params.data,
  });
}

async function revitalizedTireModelStatus(
  params: PostApiFunctionParams<RevitalizedTireModelStatusData>,
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `revitalized/tire/model/${params.id}/status`,
    data: params.data,
  });
}