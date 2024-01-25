import { http } from "src/api/api";
import { UpdateApiFunctionParams } from "src/types/api";

import { IdentifyData } from "../types/vehicleTireIdentifyTypes";

export { postIdentify };

async function postIdentify(
  params: UpdateApiFunctionParams<IdentifyData>,
): Promise<any> {
  return await http<any>({
    method: "POST",
    path: `vehicle/${params.id}/physical/difference`,
    data: params.data,
  });
}
