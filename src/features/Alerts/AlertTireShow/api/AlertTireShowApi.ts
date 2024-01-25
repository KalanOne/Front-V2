import { Update } from "node_modules/vite/types/hmrPayload";

import { http } from "src/api/api.ts";
import {
  GetApiFunctionParams,
  IdApiExtras,
  UpdateApiFunctionParams,
} from "src/types/api.ts";
import { PaginatedResponse } from "src/types/response.ts";

import {
  AlertTireShowResponse,
  AlertTireShowUpdateData,
} from "../types/alertTireShowTypes.ts";

export { getAlertsTiresShow, updateAlertsTiresShow, getAlertTireShow };

async function getAlertsTiresShow(
  params: GetApiFunctionParams<IdApiExtras>,
): Promise<PaginatedResponse<AlertTireShowResponse>> {
  return await http<PaginatedResponse<AlertTireShowResponse>>({
    method: "GET",
    path: `tire/${params.extras?.id}/alert`,
    params: params.params,
  });
}

async function updateAlertsTiresShow(
  params: UpdateApiFunctionParams<AlertTireShowUpdateData>,
): Promise<AlertTireShowResponse> {
  return await http<AlertTireShowResponse>({
    method: "PUT",
    path: `tire/${params.id}/alert/${params.data.alert_id}`,
    data: { comment: params.data.comment },
  });
}

async function getAlertTireShow(
  id: string,
  alert_id: number,
): Promise<AlertTireShowResponse> {
  return await http<AlertTireShowResponse>({
    method: "GET",
    path: `tire/${id}/alert/${alert_id}`,
  });
}
