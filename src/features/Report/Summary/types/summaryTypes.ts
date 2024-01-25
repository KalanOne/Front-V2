export type {
  SummaryPressureTableResponse,
  SummaryDepthTableResponse,
  SummaryAlertTableResponse,
  Alert,
};

interface SummaryPressureTableResponse {
  pressure_condition: string;
  division_name: string;
  subsidiary_name: string;
  company_name: string;
  corporate_name: string;
  tire_id: number;
  code: string;
  device_code: any;
  date: string;
  model: string;
  depth_condition: string;
  tire_application_id: string;
  size: string;
  depth: number;
  is_refection: number;
  tire_travel: number;
  pressure: string;
  real_position: number;
  location: string;
}

interface SummaryDepthTableResponse {
  date: string;
  tire_id: number;
  division_name: string;
  subsidiary_name: string;
  company_name: string;
  corporate_name: string;
  code: string;
  device_code: any;
  model: string;
  depth_condition: string;
  tire_application_id: string;
  movement_tire_id: number;
  size: string;
  depth: number;
  real_position: number;
  location: string;
  is_refection: number;
}

interface SummaryAlertTableResponse {
  [key: string]: Alert[];
}

interface Alert {
  rfid_id: any;
  tire_id: number;
  movement_tire_id: number;
  alert_id: number;
  comment: any;
  tire_review_date: string;
  code: string;
  device_code: any;
  model: string;
  size: string;
  code_alert: string;
  alert_cause: string;
  location: string;
  real_position: number;
  created_at: string;
  created_date: string;
}
