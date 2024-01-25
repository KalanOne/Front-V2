import { http } from "src/api/api";

import {
  VehicleReviewUpdateData,
  VehicleReviewUpdateResponse,
} from "../types/vehicleReviewUpdateTypes";

export { getVehicleReviewsUpdate, vehicleReviewsUpdateOdometer };

async function getVehicleReviewsUpdate(
  params: any,
  id: string,
): Promise<VehicleReviewUpdateResponse[]> {
  return await http<VehicleReviewUpdateResponse[]>({
    method: "GET",
    path: `vehicle/${id}/review/history`,
    params: params,
  });
}

async function vehicleReviewsUpdateOdometer(
  id: string | number,
  data: VehicleReviewUpdateData,
) {
  return await http<any>({
    method: "PUT",
    path: `vehicle/${id}/review/history/${data.odometerId}`,
    data: { odometer: data.odometer },
  });
}
