import { z } from "zod";

export { vehicleTypePolicyCreateSchema, vehicleTypePolicyCreateDefaultValues };
export type { VehicleTypePolicyCreateSchemaType };

const vehicleTypePolicyCreateSchema = z.object({
  vehicle_type_id: z.coerce.string().min(1, "Vehicle Type is required"),
  axle_type: z.coerce.string().min(1, "Axle is required"),
  recommended_pressure: z.coerce
    .number()
    .gte(1, "Recommended Pressure is required"),
  tolerance: z.coerce.number().gte(1, "Tolerance is required"),
});

type VehicleTypePolicyCreateSchemaType = z.infer<
  typeof vehicleTypePolicyCreateSchema
>;

interface VehicleTypePolicyCreateDefaultValues {
  vehicle_type_id: string;
  axle_type: string;
  recommended_pressure: number;
  tolerance: number;
}

const vehicleTypePolicyCreateDefaultValues: VehicleTypePolicyCreateDefaultValues =
  {
    vehicle_type_id: "",
    axle_type: "",
    recommended_pressure: 0,
    tolerance: 0,
  };
