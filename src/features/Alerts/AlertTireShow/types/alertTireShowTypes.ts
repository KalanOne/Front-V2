import { OriginalModelTireModel } from "src/features/Tire/OriginalModel/types/originalModelTypes.ts";
import { SizeResponse } from "src/features/Tire/Size/types/sizeTypes.ts";
import { CreatedBy } from "src/types/response.ts";

export type {
  AlertTireShowResponse,
  AlertTireShowUpdateData,
  TireReviewDepthLine,
  Alert,
  Subsidiary,
  TireCycle,
};

interface Alert {
  alert_id: number;
  alert_type: string;
  code: string;
  colloquial_name: string;
  created_at: string;
  created_by: CreatedBy;
  details: string;
  priority: string;
  ranking_alert: string;
  status: number;
  suggestion: string;
  updated_at: string;
  updated_by: CreatedBy;
}

interface Subsidiary {
  archived: number;
  company_id: number;
  country: string;
  created_at: string;
  created_by: number;
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
  updated_by: number;
}

interface Tire {
  archived: number;
  cap_and_casing: number;
  code: string;
  created_at: string;
  created_by: CreatedBy;
  device_code: string; // TODO: check if this is correct
  dot: string; // TODO: check if this is correct
  dot_date: string; // TODO: check if this is correct
  old_tire_id: number;
  status: number;
  subsidiary: Subsidiary;
  subsidiary_id: number;
  tire_id: number;
  updated_at: string;
  updated_by: CreatedBy;
}

interface Variation {
  approved: number;
  archived: number;
  created_at: string;
  created_by: number;
  depth: number;
  helmet_value_original: number;
  helmet_value_revitalized: number;
  maximum_pressure: number;
  number_layers: number;
  old_tire_model_variation_id: number;
  projection: number;
  recommended_pressure: number;
  status: number;
  tire_application_id: string;
  tire_model: OriginalModelTireModel;
  tire_model_id: number;
  tire_model_variation_id: number;
  tire_size: SizeResponse;
  tire_size_id: number;
  tolerance: number;
  updated_at: string;
  updated_by: CreatedBy;
}

interface TireCycle {
  created_at: string;
  created_by: CreatedBy;
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
  updated_by: CreatedBy;
  variation: Variation;
}

interface MovementTire {
  archived: number;
  created_at: string;
  created_by: CreatedBy | number;
  history: number;
  movement: string;
  movement_tire_id: number;
  old_movement_tire_id: number;
  tire_cycle: TireCycle;
  tire_cycle_id: number;
  updated_at: string;
  updated_by: CreatedBy | number;
}

interface TireReviewDepthLine {
  average_depth_external: number;
  average_depth_internal: number;
  average_depth_middle: number;
  created_at: string;
  tire_review_depth_line_id: number;
  tire_review_id: number;
  updated_at: string;
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
  movement_tire_id: number;
  old_tire_review_id: number; // TODO check if this is correct
  pressure: string;
  sensor_check: number;
  tire_review_depth_line: TireReviewDepthLine;
  tire_review_id: number;
  updated_at: string;
  updated_by: CreatedBy;
  vehicle_review_id: number;
}

interface AlertTireShowResponse {
  alert: Alert;
  alert_cause: string;
  alert_id: number;
  alert_tire_id: number;
  comment: string;
  created_at: string;
  created_by: CreatedBy;
  movement_tire: MovementTire;
  tire_review: TireReview;
  tire_review_id: number;
  updated_at: string;
  updated_by: CreatedBy;
}

interface AlertTireShowUpdateData {
  alert_id: number;
  comment: string;
}
