import { HttpsRounded } from "@mui/icons-material";

import { http } from "src/api/api.ts";
import { CorporateResponse } from "src/features/Corporate/types/corporateTypes";
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
  CompanyCreateData,
  CompanyResponse,
  CompanyStatusData,
  CompanyUpdateData,
} from "../types/companyTypes";

export {
  getCompany,
  getCompanies,
  createCompany,
  deleteCompany,
  companyStatus,
  updateCompany,
  getCorporatesInput,
};

async function getCompany(
  params: GetApiFunctionParams,
): Promise<CompanyResponse> {
  return await http<CompanyResponse>({
    method: "GET",
    path: `company/${params.id}`,
  });
}

async function getCompanies(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<CompanyResponse>> {
  return await http<PaginatedResponse<CompanyResponse>>({
    method: "GET",
    path: "company",
    params: params.params,
  });
}

async function createCompany(
  params: CreateApiFunctionParams<CompanyCreateData>,
): Promise<CompanyResponse> {
  return await http<CompanyResponse>({
    method: "POST",
    path: `company`,
    data: params.data,
    dataWithFiles: true,
  });
}

async function updateCompany(
  params: UpdateApiFunctionParams<CompanyUpdateData>,
): Promise<CompanyResponse> {
  return await http<CompanyResponse>({
    method: "POST",
    path: `company/${params.id}`,
    data: params.data,
    dataWithFiles: true,
  });
}

async function deleteCompany(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `company/${params.id}`,
  });
}

async function companyStatus(params: PostApiFunctionParams<CompanyStatusData>) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `company/${params.id}/status`,
    data: params.data,
  });
}

async function getCorporatesInput(
  params: GetApiFunctionParams,
): Promise<CorporateResponse[]> {
  return await http<CorporateResponse[]>({
    method: "GET",
    path: "corporate",
    params: params.params,
  });
}
