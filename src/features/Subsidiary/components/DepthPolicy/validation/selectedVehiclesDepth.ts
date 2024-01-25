import { z } from "zod";

export { selectedVehiclesDepthSchema, selectedVehiclesDepthDefaultValues };
export type { SelectedVehiclesDepthSchemaType };

const selectedVehiclesDepthSchema = z.object({
  depth: z.array(
    z.object({
      axle_type: z.coerce.string().min(1, "Axle is required"),
      good_depth: z.coerce.number().gte(1, "Good Depth is required"),
      scheduled_withdrawal: z.coerce
        .number()
        .gte(1, "Scheduled Withdrawal is required"),
      critical_withdrawal: z.coerce
        .number()
        .gte(1, "Critical Withdrawal is required"),
    }),
  ),
});

type SelectedVehiclesDepthSchemaType = z.infer<typeof selectedVehiclesDepthSchema>;

interface SelectedVehiclesDepthDefaultValues {
  depth: {
    axle_type: string;
    critical_withdrawal: number;
    good_depth: number;
    scheduled_withdrawal: number;
  }[];
}

const selectedVehiclesDepthDefaultValues: SelectedVehiclesDepthDefaultValues = {
  depth: [],
};
