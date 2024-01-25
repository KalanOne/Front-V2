import { http } from "src/api/api.ts";

import { SummaryResponse } from "../types/dashboardTypes.ts";

export { getDashboardSummary };

async function getDashboardSummary(
  level: string = "company",
): Promise<SummaryResponse> {
  return await http<SummaryResponse>({
    method: "GET",
    path: `report/summary/dashboard`,
    params: {
      level,
    },
  });
}
