import { http } from "src/api/api.ts";
import { GetApiFunctionParams, IdApiExtras } from "src/types/api.ts";
import { PaginatedResponse } from "src/types/response.ts";

import { AlertVehicleResponse } from "../types/alertsVehiclesTypes.ts";

export { getAlertsVehicles };

async function getAlertsVehicles(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<AlertVehicleResponse>> {
  return await http<PaginatedResponse<AlertVehicleResponse>>({
    method: "GET",
    path: "alert/vehicles",
    params: params.params,
  });
}
