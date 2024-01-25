import { http } from "src/api/api";
import { AssociationResponse } from "src/features/Association/types/associationTypes";
import {
  CreateApiFunctionParams,
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  PostApiFunctionParams,
  UpdateApiFunctionParams,
} from "src/types/api";
import { MessageResponse, PaginatedResponse } from "src/types/response";

import {
  CommissionedDriverCreateData,
  CommissionedDriverResponse,
  CommissionedDriverStatusData,
  CommissionedDriverUpdateData,
} from "../types/commissionedDriverTypes";

export {
  getCommissionedDrivers,
  createCommissionedDriver,
  updateCommissionedDriver,
  deleteCommissionedDriver,
  commissionedDriverStatus,
  getAssociations,
};

async function getCommissionedDrivers(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<CommissionedDriverResponse>> {
  return await http<PaginatedResponse<CommissionedDriverResponse>>({
    method: "GET",
    path: "commissioned",
    params: params.params,
  });
}

async function createCommissionedDriver(
  params: CreateApiFunctionParams<CommissionedDriverCreateData>,
): Promise<CommissionedDriverResponse> {
  return await http<CommissionedDriverResponse>({
    method: "POST",
    path: `commissioned`,
    data: params.data,
  });
}

async function updateCommissionedDriver(
  params: UpdateApiFunctionParams<CommissionedDriverUpdateData>,
): Promise<CommissionedDriverResponse> {
  return await http<CommissionedDriverResponse>({
    method: "PUT",
    path: `commissioned/${params.id}`,
    data: params.data,
  });
}

async function deleteCommissionedDriver(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `commissioned/${params.id}`,
  });
}

async function commissionedDriverStatus(
  params: PostApiFunctionParams<CommissionedDriverStatusData>,
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `commissioned/${params.id}/status`,
    data: params.data,
  });
}

async function getAssociations(
  params: GetApiFunctionParams,
): Promise<AssociationResponse[]> {
  return await http<AssociationResponse[]>({
    method: "GET",
    path: "association",
    params: params.params,
  });
}
