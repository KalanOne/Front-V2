import { z } from "zod";

import { optionalNumber, optionalString } from "src/utils/zod";

export { vehiclesCreateSchema, vehiclesCreateDefaultValues };
export type { VehiclesCreateSchemaType };

const vehiclesCreateSchema = z
  .object({
    economic_number: z.coerce.string().min(1),
    enrollment: z.coerce.string(),
    subsidiary_id: z.coerce.string().min(1),
    division_id: optionalString,
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
    odometer: optionalNumber,
  })
  .superRefine((val, ctx) => {
    if (val.odometer === undefined && val.has_odometer) {
      ctx.addIssue({
        path: ["odometer"],
        code: z.ZodIssueCode.custom,
        message: "Odometer is required",
      });
    }
  });

type VehiclesCreateSchemaType = z.infer<typeof vehiclesCreateSchema>;

const vehiclesCreateDefaultValues = {
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
