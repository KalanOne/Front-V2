import { http } from "src/api/api.ts";

import {
  CompanyInputResponse,
  CorporateInputResponse,
  DivisionResponseInput,
  SubsidiaryInputResponse,
  UserInputResponse,
} from "../types/inputTypes.ts";

export { getCorporates, getUsers, getDivisions, getCompanies, getSubsidiaries };

async function getCorporates(params?: any): Promise<CorporateInputResponse[]> {
  return await http<CorporateInputResponse[]>({
    method: "GET",
    path: "corporate",
    params: params,
  });
}

async function getUsers(params?: any): Promise<UserInputResponse[]> {
  return await http<UserInputResponse[]>({
    method: "GET",
    path: "user",
    params: params,
  });
}

async function getDivisions(params?: any): Promise<DivisionResponseInput[]> {
  return await http<DivisionResponseInput[]>({
    method: "GET",
    path: "division",
    params: params,
  });
}

async function getCompanies(params?: any): Promise<CompanyInputResponse[]> {
  return await http<CompanyInputResponse[]>({
    method: "GET",
    path: "company",
    params: params,
  });
}

async function getSubsidiaries(
  params?: any,
): Promise<SubsidiaryInputResponse[]> {
  return await http<SubsidiaryInputResponse[]>({
    method: "GET",
    path: "subsidiary",
    params: params,
  });
}
