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
  RetirementCauseCreateData,
  RetirementCauseResponse,
  RetirementCauseStatusData,
  RetirementCauseUpdateData,
} from "../types/retirementsCauseTypre";

export { getCauses, createCause, updateCause, deleteCause, causeStatus };

async function getCauses(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<RetirementCauseResponse>> {
  return await http<PaginatedResponse<RetirementCauseResponse>>({
    method: "GET",
    path: "retirement/cause",
    params: params.params,
  });
}

async function createCause(
  params: CreateApiFunctionParams<RetirementCauseCreateData>,
): Promise<RetirementCauseResponse> {
  return await http<RetirementCauseResponse>({
    method: "POST",
    path: `retirement/cause`,
    data: params.data,
  });
}

async function updateCause(
  params: UpdateApiFunctionParams<RetirementCauseUpdateData>,
): Promise<RetirementCauseResponse> {
  return await http<RetirementCauseResponse>({
    method: "PUT",
    path: `retirement/cause/${params.id}`,
    data: params.data,
  });
}

async function deleteCause(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `retirement/cause/${params.id}`,
  });
}

async function causeStatus(
  params: PostApiFunctionParams<RetirementCauseStatusData>,
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `retirement/cause/${params.id}/status`,
    data: params.data,
  });
}
