import { z } from "zod";

export { pressurePolicyCreateSchema, pressurePolicyCreateDefaultValues };
export type { PressurePolicyCreateSchemaType };

const pressurePolicyCreateSchema = z.object({
  economic_number: z.string().min(1, "Economic Number is required"),
  axle_type: z.coerce.string().min(1, "Axle is required"),
  recommended_pressure: z.coerce
    .number()
    .gte(1, "Recommended Pressure is required"),
  tolerance: z.coerce.number().gte(1, "Tolerance is required"),
});

type PressurePolicyCreateSchemaType = z.infer<typeof pressurePolicyCreateSchema>;

interface PressurePolicyCreateDefaultValues {
  economic_number: string;
  axle_type: string;
  recommended_pressure: number;
  tolerance: number;
}

const pressurePolicyCreateDefaultValues: PressurePolicyCreateDefaultValues = {
  economic_number: "",
  axle_type: "",
  recommended_pressure: 0,
  tolerance: 0,
};
