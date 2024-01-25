import { SubsidiaryResponse } from "../../Subsidiary/types/subsidiaryTypes";

export type {
  WareHouseResponse,
  WareHouseCreateData,
  WareHouseUpdateData,
  WareHouseStatusData,
};

interface WareHouseResponse {
  archived: number;
  country: string;
  created_at: string;
  direction_1: string;
  direction_2: string;
  external_number: string;
  internal_number: string;
  name: string;
  old_wareHouse_id: number;
  postal_code: string;
  province: string;
  state: string;
  status: number;
  subsidiary: SubsidiaryResponse;
  subsidiary_id: number;
  updated_at: string;
  warehouse_id: number;
}

interface WareHouseCreateData {
  name: string;
  subsidiary_id: number;
  direction_1: string;
  external_number: string;
  internal_number: string;
  direction_2: string;
  postal_code: string;
  country: string;
  state: string;
  province: string;
}

interface WareHouseUpdateData {
  name: string;
  subsidiary_id: number;
  direction_1: string;
  external_number: string;
  internal_number: string;
  direction_2: string;
  postal_code: string;
  country: string;
  state: string;
  province: string;
}

interface WareHouseStatusData {
  status: number;
}
