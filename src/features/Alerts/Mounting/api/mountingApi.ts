import { http } from "src/api/api";
import { GetApiFunctionParams, IdApiExtras } from "src/types/api";
import { PaginatedResponse } from "src/types/response";

import { MountingResponse } from "../types/mountingTypes";

export { getMountings };

async function getMountings(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<MountingResponse>> {
  return await http<PaginatedResponse<MountingResponse>>({
    method: "GET",
    path: "alert/mounts",
    params: params.params,
  });
}
