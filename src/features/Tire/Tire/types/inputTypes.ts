import { VehicleReview } from "./tireTypes";

export type {
  SubsidiaryInput,
  BrandInput,
  TireModelInput,
  RevitalizedTireModelInput,
  RfidInput,
  ProviderInput,
  WareHouseInput,
  VariationInput,
  RevitalizedTireModelInput2,
  CompanyInput,
  WearInput,
  DamageInput,
  DriverInput,
  RetirementCauseInput,
  ReviewInput,
  TireReviewDepth
};

interface SubsidiaryInput {
  subsidiary_id: number;
  name: string;
  status: number;
}

interface BrandInput {
  brand_type: string;
  brand_id: number;
  name: string;
  status: number;
  approved: number;
}

interface TireModelInput {
  tire_model: {
    tire_model_id: number;
    brand_id: number;
    name: string;
    status: number;
    approved: number;
  };
  tire_model_id: number;
}

interface RevitalizedTireModelInput {
  brand_id: number;
  revitalized_tire_model_id: number;
  name: string;
  status: number;
  approved: number;
}

interface RevitalizedTireModelInput2 {
  revitalized_tire_model_id: number;
  name: string;
  status: number;
  depth: number;
  approved: number;
}

interface RfidInput {
  rfid_id: number;
  device_code: string;
  status: number;
}

interface ProviderInput {
  provider_id: number;
  name: string;
  status: number;
  subsidiary?: {
    name: string;
    subsidiary_id: number;
  };
  subsidiary_id?: number;
}

interface WareHouseInput {
  warehouse_id: number;
  subsidiary_id: number;
  subsidiary: {
    name: string;
    subsidiary_id: number;
  };
  name: string;
  status: number;
}

interface VariationInput {
  tire_model_variation_id: number;
  tire_size_id: number;
  number_layers: number;
  status: number;
  approved: number;
  tire_size: {
    tire_size_id: number;
    size: string;
  };
}

interface CompanyInput {
  company_id: number;
  name: string;
  status: number;
}

interface WearInput {
  wear_id: number;
  name: string;
  status: number;
  frequency: number;
}

interface DamageInput {
  damage_id: number;
  name: string;
  status: number;
  frequency: number;
}

interface DriverInput {
  driver_id: number;
  name: string;
  status: number;
}

interface RetirementCauseInput {
  name: string;
  retirement_cause_id: number;
  status: number;
}

interface ReviewInput {
  accumulated_mileage: number;
  activity: string;
  archived: number;
  comment: string;
  created_at: string;
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
  tire_review_history: TireReviewHistory[];
  tire_review_id: number;
  updated_at: string;
  vehicle_review: VehicleReview;
  vehicle_review_id: number;
}

interface TireReviewHistory {
  id: number;
  tire_review_id: number;
  modified_by: number;
  type: string;
  modification_date: string;
  old_values: string;
  new_values: string;
}

interface TireReviewDepthLine {
  tire_review_depth_line_id: number;
  tire_review_id: number;
  average_depth_external: number;
  average_depth_middle: number;
  average_depth_internal: number;
  created_at: string;
  updated_at: string;
  tire_review_depth: TireReviewDepth[];
  tire_review_depth_history: TireReviewDepthHistory[];
}

interface TireReviewDepth {
  tire_review_depth_id: number;
  tire_review_depth_line_id: number;
  depth_external: number;
  depth_middle: number;
  depth_internal: number;
  created_at: string;
  updated_at: string;
}

interface TireReviewDepthHistory {
  id: number;
  tire_review_depth_line_id: number;
  modified_by: number;
  type: string;
  modification_date: string;
  old_values: string;
  new_values: string;
}

interface MovementTire {
  movement_tire_id: number;
  tire_cycle_id: number;
  movement: string;
  history: number;
  archived: number;
  old_movement_tire_id: string;
  created_at: string;
  updated_at: string;
  tire_cycle: TireCycle;
  alert_tire: any;
  vehicle_tire: VehicleTire[];
}

interface TireCycle {
  tire_cycle_id: number;
  tire_id: number;
  provider_id: number;
  tire_condition_id: string;
  tire_model_variation_id: number;
  revitalized_tire_model_id: string;
  last_division_id: number;
  price: string;
  price_revitalized: string;
  invoice_date: string;
  invoice_folio: string;
  expected_durability: string;
  number_patch: number;
  number_cycle: number;
  tire_travel: string;
  is_refection: number;
  no_yield: number;
  rejection_of_renewed: number;
  history: number;
  created_at: string;
  updated_at: string;
  tire: Tire;
}

interface Tire {
  tire_id: number;
  subsidiary_id: number;
  code: string;
  device_code: string;
  dot: string;
  dot_date: string;
  cap_and_casing: number;
  archived: number;
  status: number;
  old_tire_id: string;
  created_at: string;
  updated_at: string;
}

interface VehicleTire {
  alert_vehicle_tire: AlertVehicleTire[];
  created_at: string;
  history: number;
  movement_tire_id: number;
  updated_at: string;
  vehicle_id: number;
  vehicle_tire_id: number;
  vehicle_type_axle_tire_id: number;
}

interface AlertVehicleTire {
  alert_vehicle_tire_id: number;
  alert_id: number;
  tire_review_id: number;
  vehicle_tire_id: number;
  alert_cause: string;
  comment: string;
  created_at: string;
  updated_at: string;
}
