import { SubsidiaryResponse } from "../../Subsidiary/types/subsidiaryTypes";

export type {
  RfidResponse,
  RfidCreateData,
  RfidUpdateData,
  TireLinkResponse,
  RfidStatusData,
  RfidLinkData,
};

interface RfidResponse {
  created_at: string;
  device_code: string;
  old_rfid_id: number;
  rfid_id: number;
  status: number;
  subsidiary: SubsidiaryResponse;
  subsidiary_id: number;
  updated_at: string;
  tire: Tire[];
}

interface RfidCreateData {
  device_code: string;
  subsidiary_id: number;
}

interface RfidUpdateData {
  device_code: string;
  subsidiary_id: number;
}

interface TireLinkResponse {
  code: string;
  status: number;
  tire_id: number;
}

interface TireLinkResponse {
  tire_id: number;
  code: string;
  status: number;
}

interface Tire {
  tire: TireLinkResponse;
}

interface RfidStatusData {
  status: number;
}

interface RfidLinkData {
  rfid_id: number;
  tire_id: number;
}
