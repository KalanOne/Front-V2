import { http } from "src/api/api.ts";
import {
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  IdApiExtras,
  UpdateApiFunctionParams,
} from "src/types/api.ts";
import { MessageResponse, PaginatedResponse } from "src/types/response.ts";

import {
  VehicleShowResponse,
  VehicleShowUpdateData,
} from "../types/vehicleShowTypes.ts";

export { getVehiclesShow, updateVehiclesShow, deleteVehiclesShow };

async function getVehiclesShow(
  params: GetApiFunctionParams<IdApiExtras>,
): Promise<PaginatedResponse<VehicleShowResponse>> {
  return await http<PaginatedResponse<VehicleShowResponse>>({
    method: "GET",
    path: `vehicle/${params.extras?.id}/alert`,
    params: params.params,
  });
}

async function updateVehiclesShow(
  params: UpdateApiFunctionParams<VehicleShowUpdateData>,
): Promise<VehicleShowResponse> {
  return await http<VehicleShowResponse>({
    method: "PUT",
    path: `vehicle/${params.id}/alert/${params.data.alert_vehicle_tire_id}`,
    data: { comment: params.data.comment },
  });
}

async function deleteVehiclesShow(
  params: DeleteApiFunctionParams<IdApiExtras>,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `vehicle/${params.id}/alert/${params.extras?.id}`,
  });
}
