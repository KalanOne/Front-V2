import { http } from "src/api/api";
import {
  GetApiFunctionParams,
  IdApiExtras,
  UpdateApiFunctionParams,
} from "src/types/api";

import { PolicySendData } from "../types/applicationPolicyTypes";

export {
  getSubsidiary,
  getTolerancePolicy,
  getTireApplication,
  postTolerancePolicy,
};

async function getSubsidiary(params: GetApiFunctionParams): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `subsidiary/${params.id}`,
  });
}

async function getTolerancePolicy(
  params: GetApiFunctionParams<IdApiExtras>,
): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `subsidiary/${params.extras?.id}/depth/tolerance/policy`,
    params: params.params,
  });
}

async function getTireApplication(params: GetApiFunctionParams): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `tire/application`,
    params: params.params,
  });
}

async function postTolerancePolicy(
  params: UpdateApiFunctionParams<PolicySendData, IdApiExtras>,
): Promise<any> {
  return await http<any>({
    method: "PUT",
    path: `subsidiary/${params.id}/depth/tolerance/policy/${params.extras?.id}`,
    data: params.data,
  });
}
