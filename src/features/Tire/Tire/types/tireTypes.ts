export type {
  TireResponse,
  TireCreateData,
  TireUpdateData,
  RevitalizedData,
  ChangeLocation,
  VehicleReview,
  VehicleTire,
  VehicleTypeAxleTire,
  Vehicle,
  Subsidiary,
  Company,
  Corporate,
  TireModel,
  TireSize,
  DeleteMovementIds,
  SendToWareHouseRevitalizationIds,
  SendToWareHouseRepairIds,
  UpdateTireReviewDataIds,
};

interface TireResponse {
  archived: number;
  cap_and_casing: number;
  code: string;
  created_at: string;
  created_by: CreatedBy;
  cycle: Cycle;
  device_code: string;
  dot: string;
  dot_date: string;
  old_tire_id: string;
  rfid_tire: any;
  status: number;
  subsidiary: Subsidiary;
  subsidiary_id: number;
  tire_id: number;
  updated_at: string;
  updated_by: UpdatedBy;
}

interface CreatedBy {
  user_id: number;
  name: string;
  last_name_1: string;
  last_name_2: string;
  email: string;
}

interface UpdatedBy {
  user_id: number;
  name: string;
  last_name_1: string;
  last_name_2: string;
  email: string;
}

interface TireCreateData {
  code: string;
  subsidiary_id: string;
  warehouse_id: string;
  provider_id: string;
  tire_model_variation_id: string;
  price: number;
  expected_durability: number;
  dot: string;
  invoice_date: string;
  invoice_folio: string;
}

interface TireUpdateData {
  cap_and_casing: boolean;
  code: string;
  dot: string;
  expected_durability: number;
  invoice_date: string;
  invoice_folio: string;
  is_refection: boolean;
  price: number;
  provider_id: string;
  subsidiary_id: string;
  tire_model_variation_id: string;
  warehouse_id: string;
}

interface RevitalizedData {
  code: string;
  comment: string;
  date_return: string;
  depth: number;
  expected_durability: number;
  invoice_date: string;
  invoice_folio: string;
  price: number;
  revitalized_tire_model_id: string;
  warehouse_id: string;
}

interface ChangeLocation {
  company_id: string;
  subsidiary_id: string;
  warehouse_id: string;
}

interface Subsidiary {
  archived: number;
  company: Company;
  company_id: number;
  country: string;
  created_at: string;
  created_by: number;
  direction_1: string;
  direction_2: string;
  external_number: string;
  internal_number: string;
  name: string;
  old_subsidiary_id: number;
  policy: Policy;
  postal_code: string;
  province: string;
  state: string;
  status: number;
  subsidiary_id: number;
  updated_at: string;
  updated_by: number;
}

interface Policy {
  created_at: string;
  created_by: number;
  depth_sampling: number;
  directional_tire_rotation: number;
  helmet_policy: number;
  inspection: number;
  number_cycle: number;
  old_subsidiary_id: number;
  operator_edit: number;
  policy_id: number;
  pressure_type_axle: number;
  refection_review: number;
  send_pressure_setting: number;
  show_alerts_different_assignment: number;
  subsidiary_id: number;
  tire_condition_axle_type: number;
  tire_rotation: number;
  tolerance_directional_mating_depth: number;
  tolerance_inflation_pressure: number;
  tolerance_mating_depth: number;
  tolerance_mating_pressure: number;
  updated_at: string;
  updated_by: number;
}

interface Company {
  archived: number;
  company_id: number;
  corporate: Corporate;
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

interface Corporate {
  archived: number;
  corporate_id: number;
  created_at: string;
  created_by: number;
  logo: string;
  name: string;
  rfc: string;
  social_reason: string;
  status: number;
  updated_at: string;
  updated_by: number;
}

interface Cycle {
  tire_cycle_id: number;
  tire_id: number;
  provider_id: number;
  tire_condition_id: string;
  tire_model_variation_id: number;
  revitalized_tire_model_id: string;
  last_division_id: number;
  price: number;
  price_revitalized: string;
  invoice_date: string;
  invoice_folio: string;
  expected_durability: number;
  number_patch: number;
  number_cycle: number;
  tire_travel: number;
  is_refection: number;
  no_yield: number;
  rejection_of_renewed: number;
  history: number;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  provider: Provider;
  condition: Condition;
  variation: Variation;
  revitalized: any;
  movement_tire: MovementTire;
}

interface Condition {
  archived: number;
  created_at: string;
  status: number;
  tire_condition_id: string;
  updated_at: string;
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
  warehouse_tire: any;
  tire_damage: any;
  tire_wear: any;
  vehicle_tire: VehicleTire[];
  division_tire: DivisionTire[];
  tire_review: TireReview[];
  surcharge_driver: any;
  tire_revitalization: any;
  tire_pile: any;
  tire_repair: any;
}

interface Provider {
  archived: number;
  created_at: string;
  created_by: number;
  name: string;
  observation: string;
  old_provider_id: number;
  provider_id: number;
  rfc: string;
  status: number;
  subsidiary_id: number;
  updated_at: string;
  updated_by: number;
}

interface Variation {
  tire_model_variation_id: number;
  tire_model_id: number;
  tire_size_id: number;
  tire_application_id: string;
  number_layers: number;
  depth: number;
  maximum_pressure: number;
  recommended_pressure: number;
  helmet_value_revitalized: number;
  helmet_value_original: number;
  tolerance: number;
  projection: number;
  approved: number;
  archived: number;
  status: number;
  old_tire_model_variation_id: number;
  created_at: string;
  updated_at: string;
  tire_size: TireSize;
  tire_model: TireModel;
  tire_model_variation_use: any;
  tire_application: any;
  tire_model_variation_policy: any;
}

interface TireModel {
  approved: number;
  archived: number;
  brand: Brand;
  brand_id: number;
  created_at: string;
  created_by: number;
  data_sheet: string;
  name: string;
  old_tire_model_id: number;
  status: number;
  tire_model_id: number;
  updated_at: string;
  updated_by: number;
}

interface Brand {
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

interface TireSize {
  approved: number;
  archived: number;
  created_at: string;
  created_by: number;
  old_tire_size_id: number;
  size: string;
  status: number;
  tire_size_id: number;
  updated_at: string;
  updated_by: number;
}

interface DivisionTire {
  division_tire_id: number;
  division_id: number;
  movement_tire_id: number;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  division: Division;
}

interface Division {
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

interface TireReview {
  tire_review_id: number;
  vehicle_review_id: number;
  movement_tire_id: number;
  activity: string;
  date: string;
  last_review_month: number;
  last_travel: number;
  accumulated_mileage: number;
  pressure: string;
  sensor_check: number;
  comment: string;
  history: number;
  archived: number;
  created_by: number;
  updated_by: number;
  old_tire_review_id: string;
  created_at: string;
  updated_at: string;
  tire_review_depth_line: TireReviewDepthLine;
  vehicle_review: VehicleReview;
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

interface VehicleReview {
  created_at: string;
  vehicle_review_id: number;
  vehicle_id: number;
  date: string;
  last_review_month: number;
  end_time: string;
  start_time: string;
  review_type: string;
  odometer: number;
  diff_previous_odometer: number;
  observation: string;
  history: number;
  old_vehicle_review_id: string;
  updated_at: string;
}

interface VehicleTire {
  created_at: string;
  history: number;
  movement_tire_id: number;
  updated_at: string;
  vehicle: Vehicle;
  vehicle_id: number;
  vehicle_tire_id: number;
  vehicle_type_axle_tire: VehicleTypeAxleTire;
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
  transmission_model: string;
  transmission_speeds: string;
  type_of_route: string;
  updated_at: string;
  updated_by: number;
  vehicle_brand_id: number;
  vehicle_engine_brand_id?: string;
  vehicle_id: number;
  vehicle_model: string;
  vehicle_type_id: number;
  vehicle_year: number;
  wheel: string;
  vehicle_pressure_policy: any;
}

interface VehicleTypeAxleTire {
  created_at: string;
  position: number;
  updated_at: string;
  vehicle_type_axle: VehicleTypeAxle;
  vehicle_type_axle_id: number;
  vehicle_type_axle_tire_id: number;
}

interface VehicleTypeAxle {
  archived: number;
  axle_number: number;
  axle_type: string;
  color: string;
  created_at: string;
  created_by: number;
  position: string;
  status: number;
  tire_application: TireApplication[];
  updated_at: string;
  updated_by: number;
  vehicle_type_axle_id: number;
  vehicle_type_id: number;
}

interface TireApplication {
  created_at: string;
  tire_application_id: string;
  updated_at: string;
  vehicle_type_axle_id: number;
  vehicle_type_axle_tire_application_id: number;
}

interface DeleteMovementIds {
  movement_tire_id: string | number;
  type_location_id: string | number;
  type: string;
}

interface SendToWareHouseRevitalizationIds {
  id: string | number;
  tire_revitalization_id: string | number;
}

interface SendToWareHouseRepairIds {
  id: string | number;
  tire_repair_id: string | number;
}

interface UpdateTireReviewDataIds {
  id: string | number;
  tire_review_id: string | number;
}
