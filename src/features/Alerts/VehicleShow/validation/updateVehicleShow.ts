import { z } from "zod";

export { vehicleShowUpdateSchema, vehicleShowUpdateDefaultValues };
export type { VehicleShowUpdateSchemaType };

const vehicleShowUpdateSchema = z.object({
  comment: z.string({ description: "Comment is required" }),
  alert_vehicle_tire_id: z.number(),
});

type VehicleShowUpdateSchemaType = z.infer<typeof vehicleShowUpdateSchema>;

interface VehicleShowUpdateDefaultValues {
  comment: string;
  alert_vehicle_tire_id: number;
}

const vehicleShowUpdateDefaultValues: VehicleShowUpdateDefaultValues = {
  comment: "",
  alert_vehicle_tire_id: 0,
};
