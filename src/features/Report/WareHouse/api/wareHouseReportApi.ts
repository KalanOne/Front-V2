import { http } from "src/api/api";

import { WareHouseReportResponse } from "../types/wareHouseReportType";

export { getReportWareHouse };

async function getReportWareHouse(
  params?: any,
): Promise<WareHouseReportResponse> {
  return await http<WareHouseReportResponse>({
    method: "GET",
    path: "report/warehouse",
    params: params,
  });
}
