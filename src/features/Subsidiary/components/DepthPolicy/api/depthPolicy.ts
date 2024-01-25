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
  DepthPolicyCreate,
  DepthPolicyUpdate,
} from "../types/depthTypes";

export {
  getDepthPolicy,
  createPressurePolicy,
  getData,
  updateDataPolicyDepth,
  deletePolicyDepth,
  getVehicleType,
};

async function getDepthPolicy(
  params: GetApiFunctionParams<IdApiExtras>,
): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `subsidiary/${params.extras?.id}/depth/policy/vehicle/axle`,
    params: params.params,
  });
}

async function createPressurePolicy(
  params: CreateApiFunctionParams<DepthPolicyCreate, IdApiExtras>,
): Promise<any> {
  return await http<any>({
    method: "POST",
    path: `subsidiary/${params.extras.id}/depth/policy/vehicle/axle`,
    data: params.data,
  });
}

async function getData(params: GetApiFunctionParams): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `subsidiary/${params.params.subsidiary_id}/depth/policy/vehicle/${params.params.vehicle_id}/axle/${params.params.vehicle_depth_policy_id}`,
  });
}

async function updateDataPolicyDepth(
  params: UpdateApiFunctionParams<DepthPolicyUpdate, IdApiExtras>,
): Promise<any> {
  return await http<any>({
    method: "PUT",
    path: `subsidiary/${params.id}/depth/policy/vehicle/${params.data.vehicle_id}/axle/${params.extras.id}`,
    data: params.data,
  });
}

async function deletePolicyDepth(
  params: DeleteApiFunctionParams<DeleteIds>,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `subsidiary/${params.id}/depth/policy/vehicle/${params.extras?.id2}/axle/${params.extras?.id3}`,
  });
}

async function getVehicleType(params: GetApiFunctionParams): Promise<any> {
  return await http<any>({
    method: "GET",
    path: "vehicle/type",
    params: params.params,
  });
}
