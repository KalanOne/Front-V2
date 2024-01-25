import { z } from "zod";


export { vehicleTireIdentifySchema, vehicleTireIdentifyDefaultValues };
export type { VehicleTireIdentifySchemaType };

const vehicleTireIdentifySchema = z.object({
  odometer: z.coerce.number().gte(1, "Odometer is required"),
  date: z.coerce.string().min(1, "Date is required"),
  review: z.array(
    z.object({
      vehicle_tire_id: z.coerce.string(),
      vehicle_type_axle_tire_id: z.coerce.string(),
      status: z.string(),
    }),
  ),
});

type VehicleTireIdentifySchemaType = z.infer<typeof vehicleTireIdentifySchema>;

interface VehicleTireIdentifyDefaultValues {
  odometer: number;
  date: string;
  review: {
    vehicle_tire_id: string;
    vehicle_type_axle_tire_id: string;
    status: string;
  }[];
}

const vehicleTireIdentifyDefaultValues: VehicleTireIdentifyDefaultValues = {
  odometer: 0,
  date: "",
  review: [],
};