import { http } from "src/api/api";

import { DamageWearsResponse } from "../types/damageWearsTypes";

export { getDamageWears };

async function getDamageWears(params?: any): Promise<DamageWearsResponse> {
  return await http<DamageWearsResponse>({
    method: "GET",
    path: "report/damage/wear",
    params: params,
  });
}
