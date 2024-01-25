import { http } from "src/api/api";

import { VariationInputResponse } from "../types/inputsTypes";

export { getVariations };

async function getVariations(
  params: any,
  id: string,
): Promise<VariationInputResponse[]> {
  return await http<VariationInputResponse[]>({
    method: "GET",
    path: `tire/model/${id}/variation`,
    params: params,
  });
}
