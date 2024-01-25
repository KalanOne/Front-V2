import { Subsidiary } from "src/features/Tire/Tire/types/tireTypes";
import { CreatedBy } from "src/types/response";

export type { SubsidiaryPolicyResponse, SubsidiaryPolicyUpdateData };

interface SubsidiaryPolicyResponse {
  created_at: string;
  created_by: CreatedBy;
  depth_sampling: number;
  directional_tire_rotation: number;
  helmet_policy: number;
  inspection: number;
  number_cycle: number;
  old_subsidiary_id?: number;
  operator_edit: number;
  policy_id: number;
  pressure_type_axle: number;
  refection_review: number;
  send_pressure_setting: number;
  show_alerts_different_assignment: number;
  subsidiary: Subsidiary;
  subsidiary_id: number;
  tire_condition_axle_type: number;
  tire_rotation: number;
  tolerance_directional_mating_depth: number;
  tolerance_inflation_pressure: number;
  tolerance_mating_depth: number;
  tolerance_mating_pressure: number;
  updated_at: string;
  updated_by: CreatedBy;
}

interface SubsidiaryPolicyUpdateData {
  number_cycle: number;
  inspection: number;
  tolerance_inflation_pressure: number;
  tolerance_mating_pressure: number;
  tolerance_directional_mating_depth: number;
  tolerance_mating_depth: number;
  tire_rotation: number;
  directional_tire_rotation: number;
  pressure_type_axle: number;
  helmet_policy: number;
  tire_condition_axle_type: number;
  show_alerts_different_assignment: number;
  send_pressure_setting: number;
  operator_edit: boolean;
  refection_review: number;
}
