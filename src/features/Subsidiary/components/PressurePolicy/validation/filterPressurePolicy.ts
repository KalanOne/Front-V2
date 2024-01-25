import { z } from "zod";

export { pressurePolicyFilterSchema, pressurePolicyFilterDefaultValues };
export type { PressurePolicyFilterSchemaType };

const pressurePolicyFilterSchema = z.object({
  vehicle_type: z.array(z.coerce.string()),
  axle_type: z.string(),
});

type PressurePolicyFilterSchemaType = z.infer<
  typeof pressurePolicyFilterSchema
>;

interface PressurePolicyFilterDefaultValues {
  vehicle_type: string[];
  axle_type: string;
}

const pressurePolicyFilterDefaultValues: PressurePolicyFilterDefaultValues = {
  vehicle_type: [],
  axle_type: "",
};
