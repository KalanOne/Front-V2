import { z } from "zod";

export { subsidiaryPolicyUpdateSchema, subsidiaryPolicyUpdateDefaultValues };
export type { SubsidiaryPolicyUpdateSchemaType };

const subsidiaryPolicyUpdateSchema = z.object({
  number_cycle: z.coerce.number().min(1),
  inspection: z.coerce.number().min(1),
  tolerance_inflation_pressure: z.coerce.number().min(1),
  tolerance_mating_pressure: z.coerce.number().min(1),
  tolerance_directional_mating_depth: z.coerce.number().min(1),
  tolerance_mating_depth: z.coerce.number().min(1),
  tire_rotation: z.coerce.number().min(1),
  directional_tire_rotation: z.coerce.number().min(1),
  pressure_type_axle: z.boolean(), // number
  helmet_policy: z.boolean(), // number
  tire_condition_axle_type: z.boolean(), // number
  show_alerts_different_assignment: z.boolean(), // number
  send_pressure_setting: z.boolean(), // number
  operator_edit: z.boolean(), // boolean
  refection_review: z.boolean(), // number
});

type SubsidiaryPolicyUpdateSchemaType = z.infer<
  typeof subsidiaryPolicyUpdateSchema
>;

interface SubsidiaryPolicyUpdateDefaultValues {
  number_cycle: string;
  inspection: string;
  tolerance_inflation_pressure: string;
  tolerance_mating_pressure: string;
  tolerance_directional_mating_depth: string;
  tolerance_mating_depth: string;
  tire_rotation: string;
  directional_tire_rotation: string;
  pressure_type_axle: boolean;
  helmet_policy: boolean;
  tire_condition_axle_type: boolean;
  show_alerts_different_assignment: boolean;
  send_pressure_setting: boolean;
  operator_edit: boolean;
  refection_review: boolean;
}

const subsidiaryPolicyUpdateDefaultValues: SubsidiaryPolicyUpdateDefaultValues =
  {
    number_cycle: "",
    inspection: "",
    tolerance_inflation_pressure: "",
    tolerance_mating_pressure: "",
    tolerance_directional_mating_depth: "",
    tolerance_mating_depth: "",
    tire_rotation: "",
    directional_tire_rotation: "",
    pressure_type_axle: false,
    helmet_policy: false,
    tire_condition_axle_type: false,
    show_alerts_different_assignment: false,
    send_pressure_setting: false,
    operator_edit: false,
    refection_review: false,
  };
