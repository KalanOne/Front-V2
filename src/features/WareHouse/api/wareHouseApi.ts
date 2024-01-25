import { http } from "src/api/api";
import {
  CreateApiFunctionParams,
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  PostApiFunctionParams,
  UpdateApiFunctionParams,
} from "src/types/api";
import { MessageResponse, PaginatedResponse } from "src/types/response";

import {
  WareHouseCreateData,
  WareHouseResponse,
  WareHouseStatusData,
  WareHouseUpdateData,
} from "../types/wareHouseTypes";

export {
  getWareHouses,
  createWareHouse,
  updateWareHouse,
  deleteWareHouse,
  wareHouseStatus,
};

async function getWareHouses(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<WareHouseResponse>> {
  return await http<PaginatedResponse<WareHouseResponse>>({
    method: "GET",
    path: "warehouse",
    params: params.params,
  });
}

async function createWareHouse(
  params: CreateApiFunctionParams<WareHouseCreateData>,
): Promise<WareHouseResponse> {
  return await http<WareHouseResponse>({
    method: "POST",
    path: `warehouse`,
    data: params.data,
  });
}

async function updateWareHouse(
  params: UpdateApiFunctionParams<WareHouseUpdateData>,
): Promise<WareHouseResponse> {
  return await http<WareHouseResponse>({
    method: "PUT",
    path: `warehouse/${params.id}`,
    data: params.data,
  });
}

async function deleteWareHouse(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `warehouse/${params.id}`,
  });
}

async function wareHouseStatus(
  params: PostApiFunctionParams<WareHouseStatusData>,
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `warehouse/${params.id}/status`,
    data: params.data,
  });
}
