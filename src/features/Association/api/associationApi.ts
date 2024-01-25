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
  AssociationCreateData,
  AssociationResponse,
  AssociationStatusData,
  AssociationUpdateData,
} from "../types/associationTypes";

export {
  getAssociations,
  createAssociation,
  updateAssociation,
  deleteAssociation,
  associationStatus,
};

async function getAssociations(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<AssociationResponse>> {
  return await http<PaginatedResponse<AssociationResponse>>({
    method: "GET",
    path: "association",
    params: params.params,
  });
}

async function createAssociation(
  params: CreateApiFunctionParams<AssociationCreateData>,
): Promise<AssociationResponse> {
  return await http<AssociationResponse>({
    method: "POST",
    path: `association`,
    data: params.data,
  });
}

async function updateAssociation(
  params: UpdateApiFunctionParams<AssociationUpdateData>,
): Promise<AssociationResponse> {
  return await http<AssociationResponse>({
    method: "PUT",
    path: `association/${params.id}`,
    data: params.data,
  });
}

async function deleteAssociation(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `association/${params.id}`,
  });
}

async function associationStatus(
  params: PostApiFunctionParams<AssociationStatusData>,
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `association/${params.id}/status`,
    data: params.data,
  });
}
