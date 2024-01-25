import { http } from "src/api/api.ts";

import {
  BrandResponseInput,
  CompanyInputResponse,
  CorporateInputResponse,
  ModelInputResponse,
  SizeResponseInput,
  SubsidiaryInputResponse,
} from "../types/inputsTypes.ts";

export {
  getSizes,
  getCorporates,
  getBrands,
  getCompanies,
  getSubsidiaries,
  getModels,
};
async function getSizes(params?: any): Promise<SizeResponseInput[]> {
  return await http<SizeResponseInput[]>({
    method: "GET",
    path: "tire/size",
    params: params,
  });
}

async function getCorporates(params?: any): Promise<CorporateInputResponse[]> {
  return await http<CorporateInputResponse[]>({
    method: "GET",
    path: "corporate",
    params: params,
  });
}

async function getBrands(params?: any): Promise<BrandResponseInput[]> {
  return await http<BrandResponseInput[]>({
    method: "GET",
    path: "brand",
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

async function getModels(params?: any): Promise<ModelInputResponse[]> {
  return await http<ModelInputResponse[]>({
    method: "GET",
    path: "tire/model",
    params: params,
  });
}
