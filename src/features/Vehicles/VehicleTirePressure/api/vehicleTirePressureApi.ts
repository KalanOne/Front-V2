import { http } from "src/api/api";
import {
  GetApiFunctionParams,
  IdApiExtras,
  UpdateApiFunctionParams,
} from "src/types/api";

import { ReviewData, ReviewPressureData } from "../types/vehiclePressureTypes";

export { getAxle, getReviewVehicle, postReviewVehicle, postPressure };

async function getAxle(
  params: GetApiFunctionParams<IdApiExtras>,
): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `vehicle/${params.extras.id}/axles`,
  });
}

async function getReviewVehicle(
  params: GetApiFunctionParams<IdApiExtras>,
): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `vehicle/${params.extras.id}/review`,
  });
}

async function postReviewVehicle(
  params: UpdateApiFunctionParams<ReviewData>,
): Promise<any> {
  return await http<any>({
    method: "POST",
    path: `vehicle/${params.id}/review`,
    data: params.data,
  });
}

async function postPressure(
  params: UpdateApiFunctionParams<ReviewPressureData>,
): Promise<any> {
  return await http<any>({
    method: "POST",
    path: `vehicle/${params.id}/review/pressure`,
    data: params.data,
    dataWithFiles: true,
  });
}
