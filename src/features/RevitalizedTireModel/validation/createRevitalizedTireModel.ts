import { z } from "zod";


export {
  revitalizedTireModelCreateSchema,
  revitalizedTireModelCreateDefaultValues,
};
export type { RevitalizedTireModelCreateSchemaType };

const revitalizedTireModelCreateSchema = z.object({
  brand_id: z.coerce.number().gte(1, "Brand is required"),
  depth: z.coerce.number().gte(1, "Depth is required"),
  name: z.string().min(1, "Name is required").max(10),
  tire_application_id: z.string().min(1, "Tire application is required"),
});

type RevitalizedTireModelCreateSchemaType = z.infer<
  typeof revitalizedTireModelCreateSchema
>;

interface RevitalizedTireModelCreateDefaultValues {
  brand_id: number;
  depth: number;
  name: string;
  tire_application_id: string;
}

const revitalizedTireModelCreateDefaultValues: RevitalizedTireModelCreateDefaultValues =
  {
    brand_id: 0,
    depth: 0,
    name: "",
    tire_application_id: "",
  };