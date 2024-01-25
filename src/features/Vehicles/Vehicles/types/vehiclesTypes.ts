import { Subsidiary } from "src/features/Alerts/AlertTireShow/types/alertTireShowTypes";
// import { VehicleType } from "src/features/Alerts/MountingShow/types/mountingShowTypes";
import { CreatedBy } from "src/types/response";

export type {
  VehiclesResponse,
  VehiclesCreateData,
  VehiclesUpdateData,
  Division,
  Driver,
  VehicleBrand,
  VehicleTireAlert,
  VehiclesStatusData,
  VehiclesMoveData,
};

interface VehiclesResponse {
  archived: number;
  created_at: string;
  created_by: CreatedBy;
  cylinder_capacity: number; // TODO - check if this is correct
  division: Division[];
  driver: Driver;
  economic_number: string;
  engine_transmission_brand_id: number;
  enrollment: string; // TODO - check if this is correct
  gps_vehicle: string[]; // TODO - check if this is correct
  has_odometer: number;
  old_vehicle_id: number; // TODO - check if this is correct
  status: number;
  subsidiary: Subsidiary;
  subsidiary_id: number;
  transmission_model: string; // TODO - check if this is correct
  transmission_speeds: number; // TODO - check if this is correct
  type_of_route: string;
  updated_at: string;
  updated_by: CreatedBy;
  vehicle_alerts: string[]; // TODO - check if this is correct
  vehicle_brand: VehicleBrand;
  vehicle_brand_id: number;
  vehicle_condition_policy: string[]; // TODO - check if this is correct
  vehicle_depth_policy: string[]; // TODO - check if this is correct
  vehicle_engine_brand: string; // TODO - check if this is correct
  vehicle_engine_brand_id: number; // TODO - check if this is correct
  vehicle_id: number;
  vehicle_model: string;
  vehicle_pressure_policy: string[]; // TODO - check if this is correct
  vehicle_review: VehicleReview[];
  vehicle_tire_alerts: VehicleTireAlert[];
  vehicle_transmission_brand: string; // TODO - check if this is correct
  vehicle_type: VehicleType;
  vehicle_type_id: number;
  vehicle_year: number;
  wheel: string;
}

interface Division {
  created_at: string;
  created_by: number;
  division: DivisionSubObject;
  division_id: number;
  division_vehicle_id: number;
  updated_at: string;
  updated_by: number;
  vehicle_id: number;
}

interface DivisionSubObject {
  archived: number;
  created_at: string;
  created_by: number;
  division_id: number;
  name: string;
  old_division_id: number;
  status: number;
  subsidiary_id: number;
  updated_at: string;
  updated_by: number;
}

interface VehicleBrand {
  approved: number;
  archived: number;
  brand_id: number;
  brand_type: string;
  created_at: string;
  created_by: number;
  name: string;
  old_brand_id: number;
  status: number;
  updated_at: string;
  updated_by: number;
}

interface VehicleReview {
  created_at: string;
  created_by: number;
  date: string;
  diff_previous_odometer: number;
  end_time: string;
  history: number;
  last_review_month: number;
  observation: string; // TODO - check if this is correct
  odometer: number;
  old_vehicle_review_id: number; // TODO - check if this is correct
  review_type: string;
  start_time: string;
  updated_at: string;
  updated_by: number;
  vehicle_id: number;
  vehicle_review_id: number;
}

interface VehicleTireAlert {
  alert: Alert;
  alert_cause: string;
  alert_id: number;
  alert_vehicle_tire_id: number;
  comment: string;
  created_at: string;
  created_by: CreatedBy;
  laravel_through_key: number;
  tire_review_id: number;
  updated_at: string;
  updated_by: CreatedBy;
  vehicle_tire_id: number;
}

interface Alert {
  alert_id: number;
  alert_type: string;
  code: string;
  colloquial_name: string;
  created_at: string;
  created_by: number;
  details: string;
  priority: string;
  ranking_alert: string;
  status: number;
  suggestion: string;
  updated_at: string;
  updated_by: number;
}

interface VehicleType {
  archived: number;
  created_at: string;
  created_by: number;
  name: string;
  old_vehicle_type_id: number;
  status: number;
  subsidiary_id: number;
  type_id: number;
  updated_at: string;
  updated_by: number;
}
interface Driver {
  driver_id: number;
  subsidiary_id: number;
  created_by: number;
  updated_by: string;
  name: string;
  status: number;
  archived: number;
  old_driver_id: number;
  created_at: string;
  updated_at: string;
  laravel_through_key: number;
}

interface VehiclesCreateData {
  economic_number: string;
  enrollment: string;
  subsidiary_id: string;
  division_id?: string;
  driver_id?: string;
  vehicle_type_id: string;
  vehicle_brand_id: string;
  type_of_route: string;
  has_odometer: boolean;
  vehicle_model?: string;
  vehicle_engine_brand_id?: string;
  engine_transmission_brand_id?: string;
  vehicle_year?: number;
  transmission_model?: string;
  wheel: string;
  transmission_speeds?: number;
  cylinder_capacity?: number;
  odometer?: number;
}

interface VehiclesUpdateData {
  economic_number: string;
  enrollment: string;
  subsidiary_id: string;
  division_id?: number;
  driver_id?: string;
  vehicle_type_id: string;
  vehicle_brand_id: string;
  type_of_route: string;
  has_odometer: boolean;
  vehicle_model?: string;
  vehicle_engine_brand_id?: string;
  engine_transmission_brand_id?: string;
  vehicle_year?: number;
  transmission_model?: string;
  wheel: string;
  transmission_speeds?: number;
  cylinder_capacity?: number;
}

interface VehiclesStatusData {
  status: number;
}

interface VehiclesMoveData {
  company_id: string | number;
  subsidiary_id: string | number;
}
