import { SubsidiaryResponse } from "../../Subsidiary/types/subsidiaryTypes";

export type {
  GpsResponse,
  GpsCreateData,
  GpsUpdateData,
  VehicleLinkResponse,
  GpsStatusData,
  GpsLinkData,
};

interface GpsResponse {
  archived: number;
  created_at: string;
  device_name: string;
  gps_id: number;
  imei: string;
  status: number;
  subsidiary: SubsidiaryResponse;
  vehicle: Vehicle[];
  subsidiary_id: number;
  updated_at: string;
}

interface GpsCreateData {
  imei: string;
  device_name: string;
  subsidiary_id: number;
}

interface GpsUpdateData {
  imei: string;
  device_name: string;
  subsidiary_id: number;
}

interface VehicleLinkResponse {
  vehicle_id: number;
  economic_number: string;
  status: number;
}
interface Vehicle {
  vehicle: VehicleLinkResponse;
}

interface GpsStatusData {
  status: number;
}

interface GpsLinkData {
  gps_id: number;
  vehicle_id: number;
}
