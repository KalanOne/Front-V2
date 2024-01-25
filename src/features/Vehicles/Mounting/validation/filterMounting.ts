import { z } from "zod";

export { mountingFilterSchema, mountingFilterDefaultValues };
export type { MountingFilterSchemaType };

const mountingFilterSchema = z.object({
  subsidiaries: z.coerce.string().array(),
  vehicle_type_id: z.coerce.string(),
  vehicle_brand_id: z.coerce.string(),
  drivers: z.coerce.string(),
});

type MountingFilterSchemaType = z.infer<typeof mountingFilterSchema>;

interface MountingFilterDefaultValues {
  subsidiaries: string[];
  vehicle_type_id: string;
  vehicle_brand_id: string;
  drivers: string;
}

const mountingFilterDefaultValues: MountingFilterDefaultValues = {
  subsidiaries: [],
  vehicle_type_id: "",
  vehicle_brand_id: "",
  drivers: "",
};
