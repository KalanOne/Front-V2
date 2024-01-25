import { http } from "src/api/api.ts";
import { MessageResponse, PaginatedResponse } from "src/types/response.ts";

import { AlertTireResponse } from "../types/alertTireTypes.ts";
import { GetApiFunctionParams, IdApiExtras } from "src/types/api.ts";

export { getAlertsTires, alertTireStatus };

async function getAlertsTires(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<AlertTireResponse>> {
  return await http<PaginatedResponse<AlertTireResponse>>({
    method: "GET",
    path: "alert/tires",
    params: params.params,
  });
}

async function alertTireStatus(
  id: string | number,
  data: {
    id: number;
    status: number;
  },
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `alert/tires/${id}/status`,
    data: data,
  });
}
