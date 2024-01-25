import { http } from "src/api/api";
import { GetApiFunctionParams, UpdateApiFunctionParams } from "src/types/api";

import {
  SubsidiaryPolicyResponse,
  SubsidiaryPolicyUpdateData,
} from "../types/subsidiaryPolicyTypes";

export { getSubsidiaryPolicies, updateSubsidiaryPolicy };

async function getSubsidiaryPolicies(
  params: GetApiFunctionParams
): Promise<SubsidiaryPolicyResponse> {
  return await http<SubsidiaryPolicyResponse>({
    method: "GET",
    path: `subsidiary/${params.id}/policy`,
  });
}

async function updateSubsidiaryPolicy(
  params: UpdateApiFunctionParams<SubsidiaryPolicyUpdateData>,
) {
  return await http<SubsidiaryPolicyResponse>({
    method: "PUT",
    path: `subsidiary/${params.id}/policy`,
    data: params.data,
  });
}
