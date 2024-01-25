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
  DriverCreateData,
  DriverResponse,
  DriverStatusData,
  DriverUpdateData,
} from "../types/driverTypes";

export { getDrivers, createDriver, updateDriver, deleteDriver, driverStatus };

async function getDrivers(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<DriverResponse>> {
  return await http<PaginatedResponse<DriverResponse>>({
    method: "GET",
    path: "driver",
    params: params.params,
  });
}

async function createDriver(
  params: CreateApiFunctionParams<DriverCreateData>,
): Promise<DriverResponse> {
  return await http<DriverResponse>({
    method: "POST",
    path: `driver`,
    data: params.data,
  });
}

async function updateDriver(
  params: UpdateApiFunctionParams<DriverUpdateData>,
): Promise<DriverResponse> {
  return await http<DriverResponse>({
    method: "PUT",
    path: `driver/${params.id}`,
    data: params.data,
  });
}

async function deleteDriver(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `driver/${params.id}`,
  });
}

async function driverStatus(
  params: PostApiFunctionParams<DriverStatusData>,
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `driver/${params.id}/status`,
    data: params.data,
  });
}
