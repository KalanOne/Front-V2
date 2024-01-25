export type { AlertVehicleResponse };

interface AlertVehicleResponse {
  alert_type: string;
  company_id: number;
  company_name: string;
  corporate_id: number;
  corporate_name: string;
  created_at: string;
  division_name: string;
  driver_id?: number;
  driver_name: string;
  economic_number: string;
  number_alert: number;
  priority: string;
  ranking_alert: string;
  search: string;
  status: number;
  subsidiary_id: number;
  subsidiary_name: string;
  updated_at: string;
  vehicle_brand: string;
  vehicle_brand_id: number;
  vehicle_id: number;
  vehicle_type: string;
  vehicle_type_id: number;
}
