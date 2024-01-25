import { http } from "src/api/api";
import { CompanyResponse } from "src/features/Company/types/companyTypes";
import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes";
import {
  CreateApiFunctionParams,
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  IdApiExtras,
  PostApiFunctionParams,
  UpdateApiFunctionParams,
} from "src/types/api";
import { MessageResponse, PaginatedResponse } from "src/types/response";

import {
  SubsidiaryCreateData,
  SubsidiaryResponse,
  SubsidiaryStatusData,
  SubsidiaryUpdateData,
} from "../types/subsidiaryTypes";

export {
  getSubsidiaries,
  createSubsidiary,
  updateSubsidiary,
  deleteSubsidiary,
  subsidiaryStatus,
  getSubsidiariesInput,
  getCompaniesInput,
};

async function getSubsidiaries(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<SubsidiaryResponse>> {
  return await http<PaginatedResponse<SubsidiaryResponse>>({
    method: "GET",
    path: "subsidiary",
    params: params.params,
  });
}

async function createSubsidiary(
  params: CreateApiFunctionParams<SubsidiaryCreateData>,
): Promise<SubsidiaryResponse> {
  return await http<SubsidiaryResponse>({
    method: "POST",
    path: `subsidiary`,
    data: params.data,
  });
}

async function updateSubsidiary(
  params: UpdateApiFunctionParams<SubsidiaryUpdateData>,
): Promise<SubsidiaryResponse> {
  return await http<SubsidiaryResponse>({
    method: "PUT",
    path: `subsidiary/${params.id}`,
    data: params.data,
  });
}

async function deleteSubsidiary(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `subsidiary/${params.id}`,
  });
}

async function subsidiaryStatus(
  params: PostApiFunctionParams<SubsidiaryStatusData>,
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `subsidiary/${params.id}/status`,
    data: params.data,
  });
}

async function getSubsidiariesInput(
  params: GetApiFunctionParams,
): Promise<SubsidiaryInputResponse[]> {
  return await http<SubsidiaryInputResponse[]>({
    method: "GET",
    path: "subsidiary",
    params: params.params,
  });
}

async function getCompaniesInput(
  params: GetApiFunctionParams,
): Promise<CompanyResponse[]> {
  return await http<CompanyResponse[]>({
    method: "GET",
    path: "company",
    params: params.params,
  });
}
