import { SubsidiaryResponse } from "../../Subsidiary/types/subsidiaryTypes";

export type { DriverResponse, DriverCreateData, DriverUpdateData, DriverStatusData };

interface DriverResponse {
  archived: number;
  created_at: string;
  driver_id: number;
  name: string;
  old_driver_id: number;
  status: number;
  subsidiary: SubsidiaryResponse;
  subsidiary_id: number;
  updated_at: string;
}

interface DriverCreateData {
  name: string;
  subsidiary_id: number;
}

interface DriverUpdateData {
  name: string;
  subsidiary_id: number;
}

interface DriverStatusData {
  status: number;
}
