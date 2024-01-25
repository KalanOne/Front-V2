export type {
  DismountedTireResponse,
  DismountedTireGraphicsResponse,
  DismountedTireTableResponse,
};

interface Warehouse {
  warehouse_id: number;
  statistics: number;
  percent: number;
}

interface CityData {
  [key: string]: Warehouse;
}

interface DismountedTireResponse {
  [key: string]: CityData;
}

interface DismountedTireGraphicsResponse {
  date: string;
  total: number;
}

interface DismountedTireTableResponse {
  tire_id: number;
  rfid_id?: string;
  warehouse_id: number;
  subsidiary_name: string;
  code: string;
  device_code?: string;
  warehouse_name: string;
  created_at: string;
}
