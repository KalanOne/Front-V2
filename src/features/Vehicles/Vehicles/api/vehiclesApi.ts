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
  VehiclesCreateData,
  VehiclesMoveData,
  VehiclesResponse,
  VehiclesStatusData,
  VehiclesUpdateData,
} from "../types/vehiclesTypes";

export {
  getVehicles,
  createVehicles,
  vehiclesStatus,
  vehiclesResetOdometer,
  deleteVehicles,
  vehiclesMove,
  updateVehicles,
};

async function getVehicles(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<VehiclesResponse>> {
  return await http<PaginatedResponse<VehiclesResponse>>({
    method: "GET",
    path: `vehicle`,
    params: params.params,
  });
}

async function createVehicles(
  params: CreateApiFunctionParams<VehiclesCreateData>,
): Promise<VehiclesResponse> {
  return await http<VehiclesResponse>({
    method: "POST",
    path: `vehicle`,
    data: params.data,
  });
}

async function vehiclesStatus(
  params: PostApiFunctionParams<VehiclesStatusData>,
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `vehicle/${params.id}/status`,
    data: params.data,
  });
}

async function vehiclesResetOdometer(
  params: PostApiFunctionParams<IdApiExtras>,
) {
  return await http<MessageResponse>({
    method: "POST",
    path: `vehicle/${params.data.id}/review/reset`,
  });
}

async function deleteVehicles(params: DeleteApiFunctionParams) {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `vehicle/${params.id}`,
  });
}

async function vehiclesMove(params: PostApiFunctionParams<VehiclesMoveData>) {
  return await http<MessageResponse>({
    method: "POST",
    path: `vehicle/${params.id}/change/location`,
    data: params.data,
  });
}

async function updateVehicles(
  params: UpdateApiFunctionParams<VehiclesUpdateData>,
): Promise<VehiclesResponse> {
  return await http<VehiclesResponse>({
    method: "PUT",
    path: `vehicle/${params.id}`,
    data: params.data,
  });
}
