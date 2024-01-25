import { http } from "src/api/api";
import { GetApiFunctionParams, IdApiExtras } from "src/types/api";
import { PaginatedResponse } from "src/types/response";

export { getHistory, getReviewHistory, getDamageHistory, getWearHistory };
async function getHistory(
  params: GetApiFunctionParams<IdApiExtras>,
): Promise<PaginatedResponse<any>> {
  return await http<PaginatedResponse<any>>({
    method: "GET",
    path: `tire/${params.extras.id}/history`,
    params: params.params,
  });
}

async function getReviewHistory(
  params: GetApiFunctionParams<IdApiExtras>,
): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `report/tire/review/history/${params.extras.id}`,
  });
}

async function getDamageHistory(
  params: GetApiFunctionParams<IdApiExtras>,
): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `tire/${params.extras.id}/damage`,
  });
}

async function getWearHistory(
  params: GetApiFunctionParams<IdApiExtras>,
): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `tire/${params.extras.id}/wear`,
  });
}
