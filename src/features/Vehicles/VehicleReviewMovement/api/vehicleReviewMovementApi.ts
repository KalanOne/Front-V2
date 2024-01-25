import { http } from "src/api/api";
import { GetApiFunctionParams, IdApiExtras } from "src/types/api";
import { PaginatedResponse } from "src/types/response";

import { VehicleReviewHistoryResponse } from "../types/vehicleReviewMovementTypes";

export { getVehicleReviewMovements };

async function getVehicleReviewMovements(
  params: GetApiFunctionParams<IdApiExtras>,
): Promise<PaginatedResponse<VehicleReviewHistoryResponse>> {
  return await http<PaginatedResponse<VehicleReviewHistoryResponse>>({
    method: "GET",
    path: `vehicle/${params.extras.id}/review/history`,
    params: params.params,
  });
}
