import { z } from "zod";

export { mountingFilterSchema, mountingFilterDefaultValues };
export type { MountingFilterSchemaType };

const mountingFilterSchema = z.object({
  vehicle_brand_id: z.coerce.string().array(),
  vehicle_type_id: z.coerce.string(),
  vehicle_id: z.coerce.string(),
  driver_id: z.coerce.string(),
});

type MountingFilterSchemaType = z.infer<typeof mountingFilterSchema>;

interface MountingFilterDefaultValues {
  vehicle_brand_id: string[];
  vehicle_type_id: string;
  vehicle_id: string;
  driver_id: string;
}

const mountingFilterDefaultValues: MountingFilterDefaultValues = {
  vehicle_brand_id: [],
  vehicle_type_id: "",
  vehicle_id: "",
  driver_id: "",
};
