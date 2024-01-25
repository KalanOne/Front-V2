import { z } from "zod";

export { depthPolicyFilterSchema, depthPolicyFilterDefaultValues };
export type { DepthPolicyFilterSchemaType };

const depthPolicyFilterSchema = z.object({
  vehicle_type: z.array(z.coerce.string()),
  axle_type: z.string(),
});

type DepthPolicyFilterSchemaType = z.infer<
  typeof depthPolicyFilterSchema
>;

interface DepthPolicyFilterDefaultValues {
  vehicle_type: string[];
  axle_type: string;
}

const depthPolicyFilterDefaultValues: DepthPolicyFilterDefaultValues = {
  vehicle_type: [],
  axle_type: "",
};
