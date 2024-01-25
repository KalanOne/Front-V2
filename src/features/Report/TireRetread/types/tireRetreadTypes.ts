export type {
  TireRetreadResponse,
  TireRetreadGraphicsResponse,
  TireRetreadTableResponse,
};

interface ProviderData {
  provider_id: number;
  subsidiary_id: number;
  average_days_revitalized: number;
  statistics: number;
  percent: number;
}

interface CityData {
  [key: string]: ProviderData;
}

interface TireRetreadResponse {
  [key: string]: CityData;
}

interface TireRetreadGraphicsResponse {
  date: string;
  total: number;
  average_days: number;
}

interface TireRetreadTableResponse {
  code: string;
  subsidiary_tire_name: string;
  device_code?: string;
  provider_name: string;
  date_send: string;
  dif_date: number;
}
