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
  GpsCreateData,
  GpsLinkData,
  GpsResponse,
  GpsStatusData,
  GpsUpdateData,
  VehicleLinkResponse,
} from "../types/gpsTypes";

export {
  getGps,
  createGps,
  updateGps,
  deleteGps,
  gpsStatus,
  getVehiclesInput,
  linkGps,
  unLinkGps,
};

async function getGps(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<GpsResponse>> {
  return await http<PaginatedResponse<GpsResponse>>({
    method: "GET",
    path: "gps",
    params: params.params,
  });
}

async function createGps(
  params: CreateApiFunctionParams<GpsCreateData>,
): Promise<GpsResponse> {
  return await http<GpsResponse>({
    method: "POST",
    path: `gps`,
    data: params.data,
  });
}

async function updateGps(
  params: UpdateApiFunctionParams<GpsUpdateData>,
): Promise<GpsResponse> {
  return await http<GpsResponse>({
    method: "PUT",
    path: `gps/${params.id}`,
    data: params.data,
  });
}

async function deleteGps(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `gps/${params.id}`,
  });
}

async function gpsStatus(params: PostApiFunctionParams<GpsStatusData>) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `gps/${params.id}/status`,
    data: params.data,
  });
}

async function linkGps(
  params: PostApiFunctionParams<GpsLinkData>,
): Promise<GpsResponse> {
  return await http<GpsResponse>({
    method: "POST",
    path: `gps/${params.data.gps_id}/vehicle/${params.data.vehicle_id}`,
  });
}

async function unLinkGps(
  params: PostApiFunctionParams<GpsLinkData>,
): Promise<GpsResponse> {
  return await http<GpsResponse>({
    method: "DELETE",
    path: `gps/${params.data.gps_id}/vehicle/${params.data.vehicle_id}`,
  });
}

async function getVehiclesInput(
  params: GetApiFunctionParams,
): Promise<VehicleLinkResponse[]> {
  return await http<VehicleLinkResponse[]>({
    method: "GET",
    path: "vehicle",
    params: params.params,
  });
}
