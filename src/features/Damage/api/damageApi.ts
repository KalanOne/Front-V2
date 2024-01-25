import { http } from "src/api/api.ts";
import {
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  IdApiExtras,
  PostApiFunctionParams,
  UpdateApiFunctionParams,
} from "src/types/api";
import { MessageResponse, PaginatedResponse } from "src/types/response.ts";

import {
  DamageResponse,
  DamageStatusData,
  DamageUpdateData,
  DamageUpdateDataComplete,
} from "../types/damageTypes";

export { getDamages, updateDamage, deleteDamage, damageStatus };

async function getDamages(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<DamageResponse>> {
  return await http<PaginatedResponse<DamageResponse>>({
    method: "GET",
    path: "damage",
    params: params.params,
  });
}

async function updateDamage(
  params: UpdateApiFunctionParams<DamageUpdateData | DamageUpdateDataComplete>,
): Promise<DamageResponse> {
  return await http<DamageResponse>({
    method: "POST",
    path: `damage/${params.id}`,
    data: params.data,
    dataWithFiles: true,
  });
}

async function deleteDamage(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `damage/${params.id}`,
  });
}

async function damageStatus(params: PostApiFunctionParams<DamageStatusData>) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `damage/${params.id}/status`,
    data: params.data,
  });
}
