import { z } from "zod";

export { selectedVehiclesSchema, selectedVehiclesDefaultValues };
export type { SelectedVehiclesSchemaType };

const selectedVehiclesSchema = z.object({
  policies: z.array(
    z.object({
      axle_type: z.coerce.string().min(1, "Axle is required"),
      recommended_pressure: z.coerce
        .number()
        .gte(1, "Recommended Pressure is required"),
      tolerance: z.coerce.number().gte(1, "Tolerance is required"),
    }),
  ),
});

type SelectedVehiclesSchemaType = z.infer<typeof selectedVehiclesSchema>;

interface SelectedVehiclesDefaultValues {
  policies: {
    axle_type: string;
    recommended_pressure: number;
    tolerance: number;
  }[];
}

const selectedVehiclesDefaultValues: SelectedVehiclesDefaultValues = {
  policies: [],
};
