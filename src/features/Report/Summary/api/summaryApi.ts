import { http } from "src/api/api";

import {
  SummaryAlertTableResponse,
  SummaryDepthTableResponse,
  SummaryPressureTableResponse,
} from "../types/summaryTypes";
import responseJson from "./x.json";
import responseJson2 from "./y.json";

export { getSummary, getSummaryTable };

async function getSummary(
  type: "pressure" | "depth" | "alert",
  params?: any,
): Promise<any> {
  if (type === "alert") {
    return responseJson;
  }

  return await http<any>({
    method: "GET",
    path: `report/summary/${type}`,
    params: params,
  });
}

async function getSummaryTable(
  type: "pressure" | "depth" | "alert",
  params?: any,
): Promise<
  | SummaryPressureTableResponse[]
  | SummaryDepthTableResponse[]
  | SummaryAlertTableResponse
> {
  if (type === "alert") {
    return responseJson2;
  }

  return await http<any>({
    method: "GET",
    path: `report/summary/details/${type}`,
    params: params,
  });
}
