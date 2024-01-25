import { http } from "src/api/api";
import { GetApiFunctionParams, IdApiExtras, UpdateApiFunctionParams } from "src/types/api";
import { PaginatedResponse } from "src/types/response";



import { MountingShowResponse, MountingShowUpdateData } from "../types/mountingShowTypes";


export { getMountingsShow, updateMountingsShow };

async function getMountingsShow(
  params: GetApiFunctionParams<IdApiExtras>,
): Promise<PaginatedResponse<MountingShowResponse>> {
  return await http<PaginatedResponse<MountingShowResponse>>({
    method: "GET",
    path: `alert/mount/${params.extras?.id}`,
    params: params.params,
  });
}

async function updateMountingsShow(
  params: UpdateApiFunctionParams<MountingShowUpdateData>,
): Promise<MountingShowResponse> {
  return await http<MountingShowResponse>({
    method: "PUT",
    path: `alert/${params.id}/mount/${params.data.vehicle_tire_id}`,
    data: { comment: params.data.comment },
  });
}