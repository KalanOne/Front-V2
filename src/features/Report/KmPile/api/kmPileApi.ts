import { http } from "src/api/api.ts";

import {
  KmPileHistoricResponse,
  KmPileModelTableResponse,
  KmPileResponsibleTableResponse,
} from "../types/kmPileTypes";
import responseJson from "./x.json";

export { getKmPile, getKmPileHistoric, getKmPileResponsible, getKmPileModel };

async function getKmPile(type: string, params?: any): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `report/pile/travel/cycle/${type}`,
    params: params,
  });
}

async function getKmPileHistoric(
  params?: any,
): Promise<KmPileHistoricResponse[]> {
  return await http<KmPileHistoricResponse[]>({
    method: "GET",
    path: `report/pile/travel/history`,
    params: params,
  });
}

async function getKmPileResponsible(
  params?: any,
): Promise<KmPileResponsibleTableResponse[]> {
  return await http<KmPileResponsibleTableResponse[]>({
    method: "GET",
    path: `report/pile/travel/details/retirement/causes`,
    params: params,
  });
}

async function getKmPileModel(
  _params?: any,
): Promise<KmPileModelTableResponse[]> {
  return responseJson;
  // TODO: uncomment next lines and quit the previous one whit the import of responseJson
  // return await http<KmPileModelTableResponse[]>({
  //   method: "GET",
  //   path: `report/pile/travel/details`,
  //   params: params,
  // });
}
