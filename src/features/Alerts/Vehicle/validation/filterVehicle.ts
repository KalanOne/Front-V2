import { z } from "zod";

export { vehicleFilterSchema, vehicleFilterDefaultValues };
export type { VehicleFilterSchemaType };

const vehicleFilterSchema = z.object({
  vehicle_brand_id: z.coerce.string().array(),
  vehicle_type_id: z.coerce.string(),
  vehicle_id: z.coerce.string(),
  driver_id: z.coerce.string(),
});

type VehicleFilterSchemaType = z.infer<typeof vehicleFilterSchema>;

interface VehicleFilterDefaultValues {
  vehicle_brand_id: string[];
  vehicle_type_id: string;
  vehicle_id: string;
  driver_id: string;
}

const vehicleFilterDefaultValues: VehicleFilterDefaultValues = {
  vehicle_brand_id: [],
  vehicle_type_id: "",
  vehicle_id: "",
  driver_id: "",
};
