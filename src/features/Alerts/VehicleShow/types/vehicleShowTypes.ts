import {
  Alert,
  TireReviewDepthLine,
} from "src/features/Alerts/AlertTireShow/types/alertTireShowTypes.ts";
import { CreatedBy } from "src/types/response.ts";

export type { VehicleShowResponse, VehicleShowUpdateData };

interface VehicleShowResponse {
  alert: Alert;
  alert_cause: string;
  alert_id: number;
  alert_vehicle_tire_id: number;
  comment: string;
  created_at: string;
  created_by: CreatedBy;
  tire_review: TireReview;
  tire_review_id: number;
  updated_at: string;
  updated_by: CreatedBy;
  vehicle_tire: VehicleTire;
  vehicle_tire_id: number;
}

interface TireReview {
  accumulated_mileage: number;
  activity: string;
  archived: number;
  comment: string;
  created_at: string;
  created_by: number;
  date: string;
  history: number;
  last_review_month: number;
  last_travel: number;
  movement_tire: MovementTire;
  movement_tire_id: number;
  old_tire_review_id: number;
  pressure: string;
  sensor_check: number;
  tire_review_depth_line: TireReviewDepthLine;
  tire_review_id: number;
  updated_at: string;
  updated_by: CreatedBy;
  vehicle_review_id: number;
}

interface MovementTire {
  archived: number;
  created_at: string;
  created_by: CreatedBy;
  history: number;
  movement: string;
  movement_tire_id: number;
  old_movement_tire_id: number;
  tire_cycle: TireCycle;
  tire_cycle_id: number;
  updated_at: string;
  updated_by: number;
}

interface TireCycle {
  created_at: string;
  created_by: number;
  expected_durability: number;
  history: number;
  invoice_date: string; // TODO: check if this is correct
  invoice_folio: string;
  is_refection: number;
  last_division_id: number;
  no_yield: number;
  number_cycle: number;
  number_patch: number;
  price: string;
  price_revitalized: string;
  provider_id: number;
  rejection_of_renewed: number;
  revitalized_tire_model_id: number; // TODO: check if this is correct
  tire: Tire;
  tire_condition_id: string;
  tire_cycle_id: number;
  tire_id: number;
  tire_model_variation_id: number;
  tire_travel: string;
  updated_at: string;
  updated_by: number;
}

interface Tire {
  archived: number;
  cap_and_casing: number;
  code: string;
  created_at: string;
  created_by: number;
  device_code: string; // TODO: check if this is correct
  dot: string; // TODO: check if this is correct
  dot_date: string; // TODO: check if this is correct
  old_tire_id: number;
  status: number;
  subsidiary_id: number;
  tire_id: number;
  updated_at: string;
  updated_by: number;
}

interface VehicleTire {
  created_at: string;
  created_by: CreatedBy;
  history: number;
  movement_tire_id: number;
  updated_at: string;
  updated_by: CreatedBy;
  vehicle: Vehicle;
  vehicle_id: number;
  vehicle_tire_id: number;
  vehicle_type_axle_tire_id: number;
}

interface Vehicle {
  archived: number;
  created_at: string;
  created_by: number;
  cylinder_capacity: number; // TODO: check if this is correct
  economic_number: string;
  engine_transmission_brand_id: number; // TODO: check if this is correct
  enrollment: string;
  has_odometer: number;
  old_vehicle_id: number;
  status: number;
  subsidiary: Subsidiary;
  subsidiary_id: number;
  transmission_model: string; // TODO: check if this is correct
  transmission_speeds: number; // TODO: check if this is correct
  type_of_route: string;
  updated_at: string;
  updated_by: number; // TODO: check if this is correct
  vehicle_brand: VehicleBrand;
  vehicle_brand_id: number;
  vehicle_driver: number; // TODO: check if this is correct
  vehicle_engine_brand_id: number; // TODO: check if this is correct
  vehicle_id: number;
  vehicle_model: string; // TODO: check if this is correct
  vehicle_type: VehicleType;
  vehicle_type_id: number;
  vehicle_year: number; // TODO: check if this is correct
  wheel: string;
}

interface Subsidiary {
  archived: number;
  company: Company;
  company_id: number;
  country: string;
  created_at: string;
  created_by: CreatedBy;
  direction_1: string;
  direction_2: string;
  external_number: string;
  internal_number?: string;
  name: string;
  old_subsidiary_id: number;
  postal_code: string;
  province: string;
  state: string;
  status: number;
  subsidiary_id: number;
  updated_at: string;
  updated_by: CreatedBy;
}

interface Company {
  archived: number;
  company_id: number;
  corporate: Coporate;
  corporate_id: number;
  created_at: string;
  created_by: CreatedBy;
  logo: string;
  name: string;
  old_company_id: number;
  rfc: string;
  social_reason: string;
  status: number;
  updated_at: string;
  updated_by: CreatedBy;
}

interface Coporate {
  archived: number;
  corporate_id: number;
  created_at: string;
  created_by: CreatedBy;
  logo: string;
  name: string;
  rfc: string;
  social_reason: string;
  status: number;
  updated_at: string;
  updated_by: CreatedBy;
}

interface VehicleBrand {
  approved: number;
  archived: number;
  brand_id: number;
  brand_type: string;
  created_at: string;
  created_by: CreatedBy;
  name: string;
  old_brand_id: number;
  status: number;
  updated_at: string;
  updated_by: CreatedBy;
}

interface VehicleType {
  approved: number;
  archived: number;
  created_at: string;
  created_by: CreatedBy;
  description: string;
  name: string;
  old_vehicle_type_id: number;
  status: number;
  structure_type: string;
  updated_at: string;
  updated_by: CreatedBy;
  vehicle_type_id: number;
}

interface VehicleShowUpdateData {
  alert_vehicle_tire_id: number;
  comment: string;
}
