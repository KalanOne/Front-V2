import { http } from "src/api/api";
import {
  CreateApiFunctionParams,
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  PostApiFunctionParams,
  UpdateApiFunctionParams,
} from "src/types/api";
import { MessageResponse, PaginatedResponse } from "src/types/response";

import {
  DivisionCreateData,
  DivisionResponse,
  DivisionStatusData,
  DivisionUpdateData,
} from "../types/divisionTypes";

export {
  getDivisions,
  createDivision,
  updateDivision,
  deleteDivision,
  divisionStatus,
};

async function getDivisions(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<DivisionResponse>> {
  return await http<PaginatedResponse<DivisionResponse>>({
    method: "GET",
    path: "division",
    params: params.params,
  });
}

async function createDivision(
  params: CreateApiFunctionParams<DivisionCreateData>,
): Promise<DivisionResponse> {
  return await http<DivisionResponse>({
    method: "POST",
    path: `division`,
    data: params.data,
  });
}

async function updateDivision(
  params: UpdateApiFunctionParams<DivisionUpdateData>,
): Promise<DivisionResponse> {
  return await http<DivisionResponse>({
    method: "PUT",
    path: `division/${params.id}`,
    data: params.data,
  });
}

async function deleteDivision(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `division/${params.id}`,
  });
}

async function divisionStatus(
  params: PostApiFunctionParams<DivisionStatusData>,
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `division/${params.id}/status`,
    data: params.data,
  });
}
