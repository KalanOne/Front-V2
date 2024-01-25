import { z } from "zod";

export { originalModelFilterSchema, originalModelFilterDefaultValues };
export type { OriginalModelFilterSchemaType };

const originalModelFilterSchema = z.object({
  status: z.string(),
  approved: z.string(),
  tire_model_variation_id: z.coerce.string(),
  brands: z.coerce.string(),
  sizes: z.coerce.string().array(),
  tire_application_id: z.string().array(),
  depth: z.coerce.string(),
  maximum_pressure: z.coerce.string(),
  number_layers: z.coerce.string(),
});

type OriginalModelFilterSchemaType = z.infer<typeof originalModelFilterSchema>;

interface OriginalModelFilterDefaultValues {
  status: string;
  approved: string;
  tire_model_variation_id: string;
  brands: string;
  sizes: string[];
  tire_application_id: string[];
  depth: string;
  maximum_pressure: string;
  number_layers: string;
}

const originalModelFilterDefaultValues: OriginalModelFilterDefaultValues = {
  status: "",
  approved: "",
  tire_model_variation_id: "",
  brands: "",
  sizes: [],
  tire_application_id: [],
  depth: "",
  maximum_pressure: "",
  number_layers: "",
};
