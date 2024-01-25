import { http } from "src/api/api";
import {
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  IdApiExtras,
  UpdateApiFunctionParams,
} from "src/types/api";
import { MessageResponse, PaginatedResponse } from "src/types/response";

import {
  SubsidiaryHelmetValueCreateData,
  SubsidiaryHelmetValueResponse,
  SubsidiaryHelmetValueUpdateData,
} from "../types/subsidiaryHelmetValueTypes";

export {
  getSubsidiaryHelmetValues,
  createSubsidiaryHelmetValue,
  deleteSubsidiaryHelmetValue,
  updateSubsidiaryHelmetValue,
};

async function getSubsidiaryHelmetValues(
  params: GetApiFunctionParams<IdApiExtras>,
): Promise<PaginatedResponse<SubsidiaryHelmetValueResponse>> {
  return await http<PaginatedResponse<SubsidiaryHelmetValueResponse>>({
    method: "GET",
    path: `subsidiary/${params.extras?.id}/helmet/value/tire/model/variation/list`,
    params: params.params,
  });
}

async function createSubsidiaryHelmetValue(
  params: UpdateApiFunctionParams<SubsidiaryHelmetValueCreateData>,
): Promise<SubsidiaryHelmetValueResponse> {
  return await http<SubsidiaryHelmetValueResponse>({
    method: "POST",
    path: `subsidiary/${params.id}/helmet/value/tire/model/variation`,
    data: params.data,
  });
}

async function deleteSubsidiaryHelmetValue(
  params: DeleteApiFunctionParams<IdApiExtras>,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `subsidiary/${params.id}/helmet/value/tire/model/variation/${params.extras?.id}`,
  });
}

async function updateSubsidiaryHelmetValue(
  params: UpdateApiFunctionParams<SubsidiaryHelmetValueUpdateData>,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "PUT",
    path: `subsidiary/${params.id}/helmet/value/tire/model/variation/${params.data.helmetId}`,
    data: {
      tire_model_id: params.data.tire_model_id,
      tire_model_variation_id: params.data.tire_model_variation_id,
      helmet_value_original: params.data.helmet_value_original,
      helmet_value_revitalized: params.data.helmet_value_revitalized,
    },
  });
}
