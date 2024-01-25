import { http } from "src/api/api";

import { DynamicCostResponse } from "../types/dynamicCostTypes";

export { getDynamicCost };

async function getDynamicCost(
  type: string,
  params?: any,
): Promise<DynamicCostResponse> {
  return await http<DynamicCostResponse>({
    method: "GET",
    path: `report/dynamic/cost/${type}`,
    params: params,
  });
}
