import { http } from "src/api/api";

import {
  BrandResponseInput,
  DivisionResponseInput,
} from "../types/inputsTypes";

export { getBrands, getDivisions };

async function getBrands(params?: any): Promise<BrandResponseInput[]> {
  return await http<BrandResponseInput[]>({
    method: "GET",
    path: "brand",
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
