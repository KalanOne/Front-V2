import { http } from "src/api/api";

import { LastMovementData } from "../types/lastMovementTypes";

export { getMovements };

async function getMovements(params?: any): Promise<LastMovementData[]> {
  return await http<LastMovementData[]>({
    method: "GET",
    path: "report/last/movement",
    params: params,
  });
}
