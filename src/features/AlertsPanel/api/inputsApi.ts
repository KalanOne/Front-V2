import { http } from "src/api/api";

import { alertsInputsResponse } from "../types/inputsTypes";

export { getAlerts };

async function getAlerts(params?: any): Promise<alertsInputsResponse[]> {
  return await http<alertsInputsResponse[]>({
    method: "GET",
    path: "alert",
    params: params,
  });
}
