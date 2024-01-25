import { z } from "zod";

import { optionalNumber, optionalString } from "src/utils/zod";

export { vehiclesUpdateSchema, vehiclesUpdateDefaultValues };
export type { VehiclesUpdateSchemaType };

const vehiclesUpdateSchema = z.object({
  economic_number: z.coerce.string().min(1),
  enrollment: z.coerce.string(),
  subsidiary_id: z.coerce.string().min(1),
  division_id: optionalNumber,
  driver_id: optionalString,
  vehicle_type_id: z.coerce.string().min(1),
  vehicle_brand_id: z.coerce.string().min(1),
  type_of_route: z.string().min(1),
  has_odometer: z.boolean(),
  vehicle_model: optionalString,
  vehicle_engine_brand_id: optionalString,
  engine_transmission_brand_id: optionalString,
  vehicle_year: optionalNumber,
  transmission_model: optionalString,
  wheel: z.string().min(1),
  transmission_speeds: optionalNumber,
  cylinder_capacity: optionalNumber,
});

type VehiclesUpdateSchemaType = z.infer<typeof vehiclesUpdateSchema>;

const vehiclesUpdateDefaultValues = {
  economic_number: "",
  enrollment: "",
  subsidiary_id: "",
  division_id: "",
  driver_id: "",
  vehicle_type_id: "",
  vehicle_brand_id: "",
  type_of_route: "",
  has_odometer: false,
  vehicle_model: "",
  vehicle_engine_brand_id: "",
  engine_transmission_brand_id: "",
  vehicle_year: "",
  transmission_model: "",
  wheel: "",
  transmission_speeds: "",
  cylinder_capacity: "",
  odometer: "",
};
