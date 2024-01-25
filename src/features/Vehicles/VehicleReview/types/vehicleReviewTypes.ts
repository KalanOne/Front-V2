import { Subsidiary } from "src/features/Alerts/AlertTireShow/types/alertTireShowTypes";
import { VehicleType } from "src/features/Alerts/MountingShow/types/mountingShowTypes";
import { Subsidiary as SubsidiaryType } from "src/features/Tire/Tire/types/tireTypes";
import { CreatedBy } from "src/types/response";

import {
  Division,
  Driver,
  VehicleBrand,
  VehicleTireAlert,
} from "../../Vehicles/types/vehiclesTypes";

export type { VehicleReviewResponse, VehicleReviewResponseInProcess };

interface VehicleReviewResponse {
  archived: number;
  created_at: string;
  created_by: CreatedBy;
  cylinder_capacity?: number; // TODO - check if this is correct
  division: Division[];
  driver?: Driver;
  economic_number: string;
  engine_transmission_brand_id?: number;
  enrollment: string;
  gps_vehicle: any[]; // TODO - check if this is correct
  has_odometer: number;
  old_vehicle_id: number;
  status: number;
  subsidiary: Subsidiary;
  subsidiary_id: number;
  transmission_model?: string; // TODO - check if this is correct
  transmission_speeds?: number; // TODO - check if this is correct
  type_of_route: string;
  updated_at: string;
  updated_by: CreatedBy;
  vehicle_alerts: any[]; // TODO - check if this is correct
  vehicle_brand: VehicleBrand;
  vehicle_brand_id: number;
  vehicle_condition_policy: any[]; // TODO - check if this is correct
  vehicle_depth_policy: VehicleDepthPolicy[];
  vehicle_engine_brand?: string; // TODO - check if this is correct
  vehicle_engine_brand_id?: number; // TODO - check if this is correct
  vehicle_id: number;
  vehicle_model?: string;
  vehicle_pressure_policy: VehiclePressurePolicy[];
  vehicle_review: VehicleReview[];
  vehicle_tire_alerts: VehicleTireAlert[]; // TODO - check if this is correct
  vehicle_transmission_brand?: string; // TODO - check if this is correct
  vehicle_type: VehicleType;
  vehicle_type_id: number;
  vehicle_year?: number; // TODO - check if this is correct
  wheel: string;
}

interface VehicleDepthPolicy {
  archived: number;
  axle_type: string;
  created_at: string;
  created_by: CreatedBy | number;
  critical_withdrawal: string;
  good_depth: string;
  scheduled_withdrawal: string;
  subsidiary_id: number;
  updated_at: string;
  updated_by: CreatedBy | number;
  vehicle_depth_policy_id: number;
  vehicle_id: number;
}

interface VehiclePressurePolicy {
  archived: number;
  axle_type: string;
  created_at: string;
  created_by: CreatedBy | number;
  recommended_pressure: number;
  subsidiary_id: number;
  tolerance: string;
  updated_at: string;
  updated_by: CreatedBy | number;
  vehicle_id: number;
  vehicle_pressure_policy_id: number;
}

interface VehicleReview {
  created_at: string;
  created_by: CreatedBy | number;
  date: string;
  diff_previous_odometer: number;
  end_time?: string;
  history: number;
  last_review_month: number;
  observation?: string;
  odometer: number;
  old_vehicle_review_id?: string; // TODO - check if this is correct
  review_type: string;
  start_time: string;
  updated_at: string;
  updated_by: CreatedBy | number;
  vehicle_id: number;
  vehicle_review_id: number;
}

interface VehicleReviewResponseInProcess {
  created_at: string;
  created_by: CreatedBy | number;
  date: string;
  diff_previous_odometer: number;
  end_time?: string;
  history: number;
  last_review_month: number;
  observation?: string;
  odometer: number;
  old_vehicle_review_id?: number; // TODO - check if this is correct
  review_type: string;
  start_time: string;
  updated_at: string;
  updated_by: CreatedBy | number;
  vehicle: Vehicle;
  vehicle_id: number;
  vehicle_review_history: any[]; // TODO - check if this is correct
  vehicle_review_id: number;
}

interface Vehicle {
  archived: number;
  created_at: string;
  created_by: number;
  cylinder_capacity?: number; // TODO: check if this is correct
  economic_number: string;
  engine_transmission_brand_id?: number; // TODO: check if this is correct
  enrollment: string;
  gps_vehicle: any[]; // TODO: check if this is correct
  has_odometer: number;
  old_vehicle_id: number;
  status: number;
  subsidiary: SubsidiaryType;
  subsidiary_id: number;
  transmission_model?: string; // TODO: check if this is correct
  transmission_speeds?: number; // TODO: check if this is correct
  type_of_route: string;
  updated_at: string;
  updated_by: CreatedBy | number;
  vehicle_brand_id: number;
  vehicle_engine_brand_id?: number; // TODO: check if this is correct
  vehicle_id: number;
  vehicle_model?: string; // TODO: check if this is correct
  vehicle_type_id: number;
  vehicle_year?: number; // TODO: check if this is correct
  wheel: string;
}
