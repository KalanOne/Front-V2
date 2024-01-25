import { CreatedBy } from "src/types/response";

export type { VehicleReviewUpdateResponse, VehicleReviewUpdateData };

interface VehicleReviewUpdateResponse {
  created_at: string;
  created_by: CreatedBy;
  date: string;
  diff_previous_odometer: number;
  end_time: string;
  history: number;
  last_review_month: string;
  observation?: string;
  odometer: number;
  old_vehicle_review_id?: number;
  review_type: string;
  start_time: string;
  updated_at: string;
  updated_by: CreatedBy;
  vehicle: Vehicle;
  vehicle_id: number;
  vehicle_review_id: number;
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
  vehicle_brand_id: number;
  vehicle_driver: number; // TODO: check if this is correct
  vehicle_engine_brand_id: number; // TODO: check if this is correct
  vehicle_id: number;
  vehicle_model: string; // TODO: check if this is correct
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
  created_by: number;
  direction_1: string;
  direction_2?: string;
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
  updated_by: number;
}

interface Company {
  archived: number;
  company_id: number;
  corporate_id: number;
  created_at: string;
  created_by: number;
  logo: string;
  name: string;
  old_company_id: number;
  rfc: string;
  social_reason: string;
  status: number;
  updated_at: string;
  updated_by: number;
}

interface VehicleReviewUpdateData {
  odometerId: number;
  odometer: number;
}
