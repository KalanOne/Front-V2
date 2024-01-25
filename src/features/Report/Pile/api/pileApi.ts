import { http } from "src/api/api.ts";

import {
  PileHistoricResponse,
  PileModelTableResponse,
  PileResponsibleTableResponse,
} from "../types/pileTypes";
import responseJson from "./x.json";

export { getPile, getPileHistoric, getPileResponsible, getPileModel };

async function getPile(type: string, params?: any): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `report/pile/depth/cycle/${type}`,
    params: params,
  });
}

async function getPileHistoric(params?: any): Promise<PileHistoricResponse[]> {
  return await http<PileHistoricResponse[]>({
    method: "GET",
    path: `report/pile/depth/history`,
    params: params,
  });
}

async function getPileResponsible(
  params?: any,
): Promise<PileResponsibleTableResponse[]> {
  return await http<PileResponsibleTableResponse[]>({
    method: "GET",
    path: `report/pile/depth/details/retirement/causes`,
    params: params,
  });
}

async function getPileModel(_params?: any): Promise<PileModelTableResponse[]> {
  return responseJson;
  // TODO: uncomment next lines and quit the previous one whit the import of responseJson
  // return await http<PileModelTableResponse[]>({
  //   method: "GET",
  //   path: `report/pile/depth/details`,
  //   params: params,
  // });
}

// report/alert/history/4/tire
// report/alert/history/21/vehicle
// report/alert/history/13/mount
// report/alert/history/80/damages
// report/alert/history/23/wear

// report/alert/details/4/tire
// report/alert/details/21/vehicle
// report/alert/details/13/mount
// report/alert/details/80/damages
// report/alert/details/23/wear
