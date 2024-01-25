import { http } from "src/api/api";
import { PostApiFunctionParams } from "src/types/api";
import { MessageResponse } from "src/types/response";

import {
  DamageButton,
  DiscardButton,
  RepairButton,
  RevitalizedButton,
  SendToWareHouseRepair,
  SendToWareHouseRevitalization,
  UpdateTireReviewData,
} from "../types/buttonTypes";
import { ReviewInput } from "../types/inputTypes";
import {
  DeleteMovementIds,
  SendToWareHouseRepairIds,
  SendToWareHouseRevitalizationIds,
  UpdateTireReviewDataIds,
} from "../types/tireTypes";

export {
  deleteMovement,
  tireButton,
  getReview,
  sendToWareHouseRevitalization,
  sendToWareHouseRepair,
  updateTireReview,
};

async function deleteMovement(
  params: PostApiFunctionParams<DeleteMovementIds>,
): Promise<MessageResponse> {
  const pathType =
    params.data.type === "PILE"
      ? "pile"
      : params.data.type === "REVITALIZATION"
      ? "revitalization"
      : params.data.type === "REPAIR"
      ? "repair"
      : "";
  return await http<MessageResponse>({
    method: "DELETE",
    path: `tire/${params.data.movement_tire_id}/${pathType}/${params.data.type_location_id}`,
  });
}

async function tireButton(
  params: PostApiFunctionParams<
    RevitalizedButton | RepairButton | DiscardButton | DamageButton
  >,
): Promise<any> {
  const pathType =
    params.data.type === "PILE"
      ? "pile"
      : params.data.type === "REVITALIZATION"
      ? "revitalization"
      : params.data.type === "REPAIR"
      ? "repair"
      : params.data.type === "DAMAGE"
      ? "damage"
      : "";
  return await http<any>({
    method: "POST",
    path: `tire/${params.id}/${pathType}`,
    data: params.data,
    dataWithFiles: true,
  });
}

async function getReview(id: string | number): Promise<ReviewInput> {
  return await http<ReviewInput>({
    method: "GET",
    path: `tire/${id}/review`,
  });
}

async function sendToWareHouseRevitalization(
  params: PostApiFunctionParams<
    SendToWareHouseRevitalization,
    SendToWareHouseRevitalizationIds
  >,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "POST",
    path: `tire/return/${params.extras.id}/revitalization/${params.extras.tire_revitalization_id}`,
    data: params.data,
    dataWithFiles: true,
  });
}

async function sendToWareHouseRepair(
  params: PostApiFunctionParams<
    SendToWareHouseRepair,
    SendToWareHouseRepairIds
  >,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "POST",
    path: `tire/return/${params.extras.id}/repair/${params.extras.tire_repair_id}`,
    data: params.data,
    dataWithFiles: true,
  });
}

async function updateTireReview(
  params: PostApiFunctionParams<UpdateTireReviewData, UpdateTireReviewDataIds>,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "PUT",
    path: `tire/${params.extras.id}/review/${params.extras.tire_review_id}`,
    data: params.data,
  });
}
