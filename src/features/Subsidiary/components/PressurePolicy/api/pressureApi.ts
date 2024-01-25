import { http } from "src/api/api";
import {
  CreateApiFunctionParams,
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  IdApiExtras,
  UpdateApiFunctionParams,
} from "src/types/api";
import { MessageResponse } from "src/types/response";

import {
  DeleteIds,
  PressurePolicyCreate,
  PressurePolicyUpdate,
  VehicleTypePolicyCreate,
} from "../types/pressureTypes";

export {
  getPressurePolicy,
  getData,
  createPressurePolicy,
  updateDataPolicy,
  deletePolicy,
  getVehicleType,
  createPressurePolicyType,
};

async function getPressurePolicy(
  params: GetApiFunctionParams<IdApiExtras>,
): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `subsidiary/${params.extras?.id}/pressure/policy/vehicle`,
    params: params.params,
  });
}

async function getData(params: GetApiFunctionParams): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `subsidiary/${params.params.subsidiary_id}/pressure/policy/vehicle/${params.params.vehicle_id}/axle/${params.params.vehicle_pressure_policy_id}`,
  });
}

async function createPressurePolicy(
  params: CreateApiFunctionParams<PressurePolicyCreate, IdApiExtras>,
): Promise<any> {
  return await http<any>({
    method: "POST",
    path: `subsidiary/${params.extras.id}/pressure/policy/vehicle`,
    data: params.data,
  });
}

async function updateDataPolicy(
  params: UpdateApiFunctionParams<PressurePolicyUpdate, IdApiExtras>,
): Promise<any> {
  return await http<any>({
    method: "PUT",
    path: `subsidiary/${params.id}/pressure/policy/vehicle/${params.data.vehicle_id}/axle/${params.extras.id}`,
    data: params.data,
  });
}

async function deletePolicy(
  params: DeleteApiFunctionParams<DeleteIds>,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `subsidiary/${params.id}/pressure/policy/vehicle/${params.extras?.id2}/axle/${params.extras?.id3}`,
  });
}

async function getVehicleType(params: GetApiFunctionParams): Promise<any> {
  return await http<any>({
    method: "GET",
    path: "vehicle/type",
    params: params.params,
  });
}

async function createPressurePolicyType(
  params: CreateApiFunctionParams<VehicleTypePolicyCreate, IdApiExtras>,
): Promise<any> {
  return await http<any>({
    method: "POST",
    path: `subsidiary/${params.extras.id}/pressure/policy/vehicle/type`,
    data: params.data,
  });
}
