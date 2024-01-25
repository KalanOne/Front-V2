import {
  TireCycle,
  TireReviewDepthLine,
} from "src/features/Alerts/AlertTireShow/types/alertTireShowTypes";
import { CreatedBy } from "src/types/response";

export type {
  VehicleReviewMovementResponse,
  Movement,
  VehicleReviewHistoryResponse,
  TireReview,
};

interface VehicleReviewMovementResponse {
  created_at: string;
  created_by: CreatedBy;
  date: string;
  diff_previous_odometer: number;
  end_time: string;
  history: number;
  last_review_month: number;
  movements: Movement[];
  observation?: string; // Todo: Check if this is correct
  odometer: number;
  old_vehicle_review_id?: number; // Todo: Check if this is correct
  review_type: string;
  start_time: string;
  updated_at: string;
  updated_by: CreatedBy | number;
  vehicle: Vehicle;
  vehicle_id: number;
  vehicle_review_id: number;
}

interface Movement {
  accumulated_mileage: number;
  activity: string;
  archived: number;
  comment?: string;
  created_at: string;
  created_by: CreatedBy;
  date: string;
  history: number;
  last_review_month: number;
  last_travel: number;
  movement_tire: MovementTire;
  movement_tire_id: number;
  old_tire_review_id?: number; // Todo: Check if this is correct
  pressure: number;
  sensor_check: number;
  tire_damage: any[]; // Missing type
  tire_review_depth_line: TireReviewDepthLine;
  tire_review_id: number;
  updated_at: string;
  updated_by: CreatedBy;
  vehicle_review_id: number;
}

interface MovementTire {
  archived: number;
  created_at: string;
  created_by: number;
  history: number;
  movement: string;
  movement_tire_id: number;
  old_movement_tire_id?: number;
  tire_cycle: TireCycle;
  tire_cycle_id: number;
  updated_at: string;
  updated_by: number;
  vehicle_tire: VehicleTire[];
}

interface VehicleTire {
  created_at: string;
  created_by: number;
  history: number;
  movement_tire_id: number;
  updated_at: string;
  updated_by: number;
  vehicle_id: number;
  vehicle_tire_id: number;
  vehicle_type_axle_tire: VehicleTypeAxleTire;
  vehicle_type_axle_tire_id: number;
}

interface VehicleTypeAxleTire {
  created_at: string;
  position: number;
  updated_at: string;
  vehicle_type_axle_id: number;
  vehicle_type_axle_tire_id: number;
}

interface Vehicle {
  archived: number;
  created_at: string;
  created_by: number;
  cylinder_capacity?: string;
  economic_number: string;
  engine_transmission_brand_id?: string;
  enrollment: string;
  has_odometer: number;
  old_vehicle_id: string;
  status: number;
  subsidiary_id: number;
  transmission_model?: string;
  transmission_speeds?: string;
  type_of_route: string;
  updated_at: string;
  updated_by: number;
  vehicle_brand_id: number;
  vehicle_engine_brand_id?: string;
  vehicle_id: number;
  vehicle_model?: string;
  vehicle_type_id: number;
  vehicle_year?: number;
  wheel: string;
}

// Cambio de endpoint

interface VehicleReviewHistoryResponse {
  vehicle_review_id: number;
  vehicle_id: number;
  vehicle_type_name: string;
  structure_type: string;
  division_name: string;
  date: string;
  last_review_month: number;
  end_time: string;
  start_time: string;
  review_type: string;
  odometer: number;
  diff_previous_odometer: number;
  observation?: string;
  history: number;
  created_by: CreatedBy;
  user_name: string;
  updated_by: CreatedBy;
  old_vehicle_review_id?: number;
  created_at: string;
  updated_at: string;
  vehicle: Vehicle;
  tire_review: TireReview[];
}

interface TireReview {
  tire_review_id: number;
  vehicle_review_id: number;
  real_position: number;
  axle_position?: number;
  movement_tire_id: number;
  activity: string;
  date: string;
  last_review_month: number;
  last_travel: number;
  accumulated_mileage: number;
  pressure: string;
  pressure_condition: string;
  recommended_pressure: number;
  tolerance_pressure_policy: number;
  pressure_loss: number;
  days_in_service: number;
  sensor_check: number;
  comment: string;
  history: number;
  archived: number;
  created_by: CreatedBy;
  user_name: string;
  updated_by: CreatedBy;
  old_tire_review_id?: number;
  created_at: string;
  updated_at: string;
  tire_damage: any[]; // TODO: Missing type
  alert_tire: AlertTire[];
  alert_vehicle_tire: AlertVehicleTire[];
  tire_review_depth_line: TireReviewDepthLine2;
  movement_tire: MovementTire2;
}

interface TireReviewDepthLine2 {
  tire_review_depth_line_id: number;
  tire_review_id: number;
  average_depth_external: number;
  average_depth_middle: number;
  average_depth_internal: number;
  depth_variation: number;
  min_depth: number;
  depth_condition: string;
  wear: number;
  remainder_depth: number;
  km_mm: number;
  cpk: number;
  cpd: number;
  projection: number;
  created_at: string;
  updated_at: string;
}

interface MovementTire2 {
  movement_tire_id: number;
  tire_cycle_id: number;
  movement: string;
  tire_application_id: string;
  brand_name: string;
  tire_model: string;
  tire_size: string;
  model: string;
  helmet_value: number;
  history: number;
  archived: number;
  created_by: number;
  updated_by?: number;
  old_movement_tire_id?: number;
  created_at: string;
  updated_at: string;
  vehicle_tire: any[]; // TODO: Missing type
  tire_cycle: TireCycle2;
}

interface Tire2 {
  tire_id: number;
  subsidiary_id: number;
  code: string;
  device_code?: string;
  dot?: string;
  dot_date?: string;
  cap_and_casing: number;
  archived: number;
  status: number;
  updated_by: number;
  created_by: number;
  old_tire_id: number;
  created_at: string;
  updated_at: string;
}

interface TireCycle2 {
  tire_cycle_id: number;
  tire_id: number;
  provider_id: number;
  tire_condition_id: string;
  tire_model_variation_id: number;
  revitalized_tire_model_id: number | null;
  last_division_id: number;
  price: string;
  price_revitalized: string;
  current_cost: number;
  invoice_date: string | null;
  invoice_folio: string | null;
  expected_durability: number;
  number_patch: number;
  number_cycle: number;
  tire_travel: string;
  is_refection: number;
  no_yield: number;
  rejection_of_renewed: number;
  history: number;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  tire: Tire2;
}

interface AlertTire {
  alert_tire_id: number;
  alert_id: number;
  tire_review_id: number;
  movement_tire_id: number;
  alert_cause: string;
  comment?: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  alert: Alert;
}

interface AlertVehicleTire {
  alert_vehicle_tire_id: number;
  alert_id: number;
  tire_review_id: number;
  vehicle_tire_id: number;
  alert_cause: string;
  comment?: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  alert: Alert;
}
interface Alert {
  alert_id: number;
  code: string;
  colloquial_name: string;
  alert_type: string;
  ranking_alert: string;
  priority: string;
  suggestion: string;
  details: string;
  status: number;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
}
