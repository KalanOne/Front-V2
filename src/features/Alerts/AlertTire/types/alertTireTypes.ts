export type { AlertTireResponse };

interface AlertTireResponse {
  brand_name: string;
  code: string;
  company_id: number;
  company_name: string;
  corporate_id: number;
  corporate_name: string;
  created_at: string;
  depth_variation: number;
  device_code: string; // TODO: check if this is correct
  division_name: string;
  is_refection: number;
  location: string;
  model_name: string;
  movement: number;
  movement_tire_id: number; // ID of item
  number_alert: number;
  number_cycle: number;
  number_layers: number;
  priority: string;
  ranking_alert: number;
  revitalized_tire_model_id: number;
  rfid_id: number; // TODO: check if this is correct
  search: string;
  size: string;
  status: number;
  subsidiary_id: number;
  subsidiary_name: string;
  tire_application_id: string;
  tire_condition_id: string;
  tire_id: number;
  tire_model_variation_id: number;
  updated_at: string;
}
