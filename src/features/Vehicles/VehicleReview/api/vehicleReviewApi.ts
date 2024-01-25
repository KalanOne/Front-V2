import { http } from "src/api/api";
import { GetApiFunctionParams } from "src/types/api";
import { PaginatedResponse } from "src/types/response";

import {
  VehicleReviewResponse,
  VehicleReviewResponseInProcess,
} from "../types/vehicleReviewTypes";

export { getVehicleReviews, getVehicleReviewsInProcess };

async function getVehicleReviews(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<VehicleReviewResponse>> {
  return await http<PaginatedResponse<VehicleReviewResponse>>({
    method: "GET",
    path: `vehicle/review`,
    params: params.params,
  });
}

async function getVehicleReviewsInProcess(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<VehicleReviewResponseInProcess>> {
  return await http<PaginatedResponse<VehicleReviewResponseInProcess>>({
    method: "GET",
    path: `vehicle/review/in/process`,
    params: params.params,
  });
}
