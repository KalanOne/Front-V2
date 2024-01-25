import { http } from "src/api/api.ts";
import { PaginatedResponse } from "src/types/response.ts";

import { RenewabilityResponse } from "../types/renewabilityTypes.ts";

export { getRenewabilities };

async function getRenewabilities(
  params?: any,
): Promise<PaginatedResponse<RenewabilityResponse>> {
  return await http<PaginatedResponse<RenewabilityResponse>>({
    method: "GET",
    path: "report/renewability/index",
    params: params,
  });
}
