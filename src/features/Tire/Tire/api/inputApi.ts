import { http } from "src/api/api";
import { PostApiFunctionParams } from "src/types/api";
import { MessageResponse } from "src/types/response";

import {
  BrandInput,
  CompanyInput,
  DamageInput,
  DriverInput,
  ProviderInput,
  RetirementCauseInput,
  RevitalizedTireModelInput,
  RevitalizedTireModelInput2,
  RfidInput,
  SubsidiaryInput,
  TireModelInput,
  VariationInput,
  WareHouseInput,
  WearInput,
} from "../types/inputTypes";
import { ChangeLocation, RevitalizedData } from "../types/tireTypes";

export {
  getSubsidiaries,
  getBrands,
  getTireModels,
  getRevitalizedTireModels,
  getRfids,
  getProviders,
  getWareHouses,
  getTireModelVariations,
  getRevitalizedTireModels2,
  getCompanies,
  changeLocation,
  returnRevitalized,
  getWears,
  getDamages,
  getDrivers,
  getRetirementCauses,
  getVehicles,
};

async function getSubsidiaries(params?: any): Promise<SubsidiaryInput[]> {
  return await http<SubsidiaryInput[]>({
    method: "GET",
    path: "subsidiary",
    params: params,
  });
}

async function getBrands(params?: any): Promise<BrandInput[]> {
  return await http<BrandInput[]>({
    method: "GET",
    path: "brand",
    params: params,
  });
}

async function getTireModels(params?: any): Promise<TireModelInput[]> {
  return await http<TireModelInput[]>({
    method: "GET",
    path: "tire/model",
    params: params,
  });
}

async function getRevitalizedTireModels(
  params?: any,
): Promise<RevitalizedTireModelInput[]> {
  return await http<RevitalizedTireModelInput[]>({
    method: "GET",
    path: "revitalized/tire/model",
    params: params,
  });
}

async function getRevitalizedTireModels2(
  params?: any,
): Promise<RevitalizedTireModelInput2[]> {
  return await http<RevitalizedTireModelInput2[]>({
    method: "GET",
    path: "revitalized/tire/model",
    params: params,
  });
}

async function getRfids(params?: any): Promise<RfidInput[]> {
  return await http<RfidInput[]>({
    method: "GET",
    path: "rfid",
    params: params,
  });
}

async function getProviders(params?: any): Promise<ProviderInput[]> {
  return await http<ProviderInput[]>({
    method: "GET",
    path: "provider",
    params: params,
  });
}

async function getWareHouses(params?: any): Promise<WareHouseInput[]> {
  return await http<WareHouseInput[]>({
    method: "GET",
    path: "warehouse",
    params: params,
  });
}

async function getTireModelVariations(
  id: string | number,
  params?: any,
): Promise<VariationInput[]> {
  return await http<VariationInput[]>({
    method: "GET",
    path: `tire/model/${id}/variation`,
    params: params,
  });
}

async function getCompanies(params?: any): Promise<CompanyInput[]> {
  return await http<CompanyInput[]>({
    method: "GET",
    path: "company",
    params: params,
  });
}

async function getWears(params?: any): Promise<WearInput[]> {
  return await http<WearInput[]>({
    method: "GET",
    path: "wear",
    params: params,
  });
}

async function getDamages(params?: any): Promise<DamageInput[]> {
  return await http<DamageInput[]>({
    method: "GET",
    path: "damage",
    params: params,
  });
}

async function getDrivers(params?: any): Promise<DriverInput[]> {
  return await http<DriverInput[]>({
    method: "GET",
    path: "driver",
    params: params,
  });
}

async function getRetirementCauses(
  params?: any,
): Promise<RetirementCauseInput[]> {
  return await http<RetirementCauseInput[]>({
    method: "GET",
    path: "retirement/cause",
    params: params,
  });
}

async function changeLocation(
  params: PostApiFunctionParams<ChangeLocation>,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "POST",
    path: `tire/${params.id}/change/location`,
    data: params.data,
  });
}

async function returnRevitalized(
  params: PostApiFunctionParams<RevitalizedData>,
): Promise<any> {
  return await http<any>({
    method: "POST",
    path: `tire/return/revitalization`,
    data: params.data,
  });
}

//History
async function getVehicles(params?: any): Promise<any[]> {
  return await http<any[]>({
    method: "GET",
    path: "vehicle",
    params: params,
  });
}
