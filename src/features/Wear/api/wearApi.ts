import { http } from "src/api/api.ts";
import {
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  IdApiExtras,
  PostApiFunctionParams,
  UpdateApiFunctionParams,
} from "src/types/api";
import { MessageResponse, PaginatedResponse } from "src/types/response.ts";

import {
  WearResponse,
  WearStatusData,
  WearUpdateDataComplete,
} from "../types/wearTypes";
import { WearUpdateData } from "../types/wearTypes";

export { getWear, updateWear, deleteWear, wearStatus };

async function getWear(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<WearResponse>> {
  return await http<PaginatedResponse<WearResponse>>({
    method: "GET",
    path: "wear",
    params: params.params,
  });
}

async function updateWear(
  params: UpdateApiFunctionParams<WearUpdateData | WearUpdateDataComplete>,
): Promise<WearResponse> {
  return await http<WearResponse>({
    method: "POST",
    path: `wear/${params.id}`,
    data: params.data,
    dataWithFiles: true,
  });
}

async function deleteWear(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `wear/${params.id}`,
  });
}

async function wearStatus(params: PostApiFunctionParams<WearStatusData>) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `wear/${params.id}/status`,
    data: params.data,
  });
}
