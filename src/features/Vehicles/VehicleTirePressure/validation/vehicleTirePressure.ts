import { z } from "zod";

export { vehicleTirePressureSchema, vehicleTirePressureDefaultValues };
export type { VehicleTirePressureSchemaType };

const vehicleTirePressureSchema = z.object({
  odometer: z.coerce.number().gte(1, "Odometer is required"),
  date: z.coerce.string().min(1, "Date is required"),
  review: z.array(
    z.object({
      movement_tire_id: z.string(),
      pressure: z.coerce.number(),
    }),
  ),
});

type VehicleTirePressureSchemaType = z.infer<typeof vehicleTirePressureSchema>;

interface VehicleTirePressureDefaultValues {
  odometer: number;
  date: string;
  review: {
    movement_tire_id: string;
    pressure: number;
  }[];
}

const vehicleTirePressureDefaultValues: VehicleTirePressureDefaultValues = {
  odometer: 0,
  date: "",
  review: [],
};
