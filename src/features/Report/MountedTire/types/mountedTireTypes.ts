export type {
  MountedTireResponse,
  MountedTireGraphicsResponse,
  MountedTireTableResponse,
};

interface VehicleData {
  vehicle_type_id: number;
  statistics: number;
  percent: number;
}

interface VehicleTypeData {
  [key: string]: VehicleData;
}

interface MountedTireResponse {
  [key: string]: VehicleTypeData;
}

interface MountedTireGraphicsResponse {
  date: string;
  total: number;
}

interface MountedTireTableResponse {
  tire_id: number;
  rfid_id?: string;
  vehicle_id: number;
  subsidiary_name: string;
  code: string;
  device_code?: string;
  economic_number: string;
  real_position: number;
  created_at: string;
}
