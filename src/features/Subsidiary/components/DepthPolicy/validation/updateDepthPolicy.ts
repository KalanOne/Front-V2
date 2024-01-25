import { z } from "zod";

export { depthPolicyUpdateSchema, depthPolicyUpdateDefaultValues };
export type { DepthPolicyUpdateSchemaType };

const depthPolicyUpdateSchema = z.object({
  economic_number: z.string().min(1, "Economic Number is required"),
  axle_type: z.coerce.string().min(1, "Axle is required"),
  good_depth: z.coerce.number().gte(1, "Good Depth is required"),
  scheduled_withdrawal: z.coerce
    .number()
    .gte(1, "Scheduled Withdrawal is required"),
  critical_withdrawal: z.coerce
    .number()
    .gte(1, "Critical Withdrawal is required"),
});

type DepthPolicyUpdateSchemaType = z.infer<typeof depthPolicyUpdateSchema>;

interface DepthPolicyUpdateDefaultValues {
  economic_number: string;
  axle_type: string;
  critical_withdrawal: number;
  good_depth: number;
  scheduled_withdrawal: number;
}

const depthPolicyUpdateDefaultValues: DepthPolicyUpdateDefaultValues = {
  economic_number: "",
  axle_type: "",
  critical_withdrawal: 0,
  good_depth: 0,
  scheduled_withdrawal: 0,
};
