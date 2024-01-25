import { http } from "src/api/api.ts";
import {
  CreateApiFunctionParams,
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  PostApiFunctionParams,
  UpdateApiFunctionParams,
} from "src/types/api";
import { MessageResponse, PaginatedResponse } from "src/types/response";

import {
  CorporateCreateData,
  CorporateResponse,
  CorporateStatusData,
  CorporateUpdateData,
} from "../types/corporateTypes";

export {
  getCorporate,
  getCorporates,
  createCorporate,
  deleteCorporate,
  corporateStatus,
  updateCorporate,
};

async function getCorporate(
  params: GetApiFunctionParams,
): Promise<CorporateResponse> {
  return await http<CorporateResponse>({
    method: "GET",
    path: `corporate/${params.id}`,
  });
}

async function getCorporates(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<CorporateResponse>> {
  return await http<PaginatedResponse<CorporateResponse>>({
    method: "GET",
    path: "corporate",
    params: params.params,
  });
}

async function createCorporate(
  params: CreateApiFunctionParams<CorporateCreateData>,
): Promise<CorporateResponse> {
  return await http<CorporateResponse>({
    method: "POST",
    path: `corporate`,
    data: params.data,
    dataWithFiles: true,
  });
}

async function updateCorporate(
  params: UpdateApiFunctionParams<CorporateUpdateData>,
): Promise<CorporateResponse> {
  return await http<CorporateResponse>({
    method: "POST",
    path: `corporate/${params.id}`,
    data: params.data,
    dataWithFiles: true,
  });
}

async function deleteCorporate(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `corporate/${params.id}`,
  });
}

async function corporateStatus(
  params: PostApiFunctionParams<CorporateStatusData>,
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `corporate/${params.id}/status`,
    data: params.data,
  });
}
