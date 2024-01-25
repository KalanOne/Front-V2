import { z } from "zod";

export { vehiclesFilterSchema, vehiclesFilterDefaultValues };
export type { VehiclesFilterSchemaType };

const vehiclesFilterSchema = z.object({
  status: z.coerce.string(),
  subsidiaries: z.coerce.string().array(),
  vehicle_type_id: z.coerce.string(),
  vehicle_brand_id: z.coerce.string(),
  type_of_route: z.string(),
  drivers: z.coerce.string(),
  has_odometer: z.coerce.string(),
  with_link_driver: z.boolean(),
  enrollment: z.coerce.string(),
  vehicle_engine_brand_id: z.coerce.string(),
  engine_transmission_brand_id: z.coerce.string(),
  cylinder_capacity: z.coerce.string(),
  transmission_model: z.coerce.string(),
  transmission_speeds: z.coerce.string(),
  vehicle_model: z.coerce.string(),
  vehicle_year: z.coerce.string(),
  date_from: z.string(),
  date_to: z.string(),
  divisions: z.coerce.string().array(),
});

type VehiclesFilterSchemaType = z.infer<typeof vehiclesFilterSchema>;

interface VehiclesFilterDefaultValues {
  status: string;
  subsidiaries: string[];
  vehicle_type_id: string;
  vehicle_brand_id: string;
  type_of_route: string;
  drivers: string;
  has_odometer: string;
  with_link_driver: boolean;
  enrollment: string;
  vehicle_engine_brand_id: string;
  engine_transmission_brand_id: string;
  cylinder_capacity: string;
  transmission_model: string;
  transmission_speeds: string;
  vehicle_model: string;
  vehicle_year: string;
  date_from: string;
  date_to: string;
  divisions: string[];
}

const vehiclesFilterDefaultValues: VehiclesFilterDefaultValues = {
  status: "",
  subsidiaries: [],
  vehicle_type_id: "",
  vehicle_brand_id: "",
  type_of_route: "",
  drivers: "",
  has_odometer: "",
  with_link_driver: false,
  enrollment: "",
  vehicle_engine_brand_id: "",
  engine_transmission_brand_id: "",
  cylinder_capacity: "",
  transmission_model: "",
  transmission_speeds: "",
  vehicle_model: "",
  vehicle_year: "",
  date_from: "",
  date_to: "",
  divisions: [],
};
