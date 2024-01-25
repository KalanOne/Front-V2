import { z } from "zod";


export { originalModelUpdateSchema, originalModelUpdateDefaultValues };
export type { OriginalModelUpdateSchemaType };

const originalModelUpdateSchema = z.object({
  data_sheet: z.any(),
  name: z.string().min(2, "Name is required").max(10),
  tire_size_id: z.coerce.number().gte(1, "Tire size is required"),
  tire_model_id: z.coerce.number(),
  brand_id: z.coerce.number().gte(1, "Brand is required"),
  tire_application_id: z.string().min(2, "Tire application is required"),
  number_layers: z.coerce.number().gte(1, "Number of layers is required"),
  depth: z.coerce.number().gte(1, "Depth is required"),
  maximum_pressure: z.coerce.number().gte(1, "Maximum pressure is required"),
  recommended_pressure: z.coerce.number().gte(1, "Recommended pressure is required"),
  tolerance: z.coerce.number().gte(1, "Tolerance is required"),
  helmet_value_original: z.coerce.number().gte(1, "Helmet value original is required"),
  helmet_value_revitalized: z.coerce.number().gte(1, "Helmet value revitalized is required"),
  tire_model_variation_use: z.string().array().nonempty("Tire model variation use is required"),
  logo: z.undefined(),
  image: z.undefined(),
  tire_model_variation_id: z.coerce.number(),
});

type OriginalModelUpdateSchemaType = z.infer<typeof originalModelUpdateSchema>;

interface OriginalModelUpdateDefaultValues {
  data_sheet: File | null;
  tire_model_id: number;
  name: string;
  tire_size_id: number;
  brand_id: number;
  tire_application_id: string;
  number_layers: number;
  depth: number;
  maximum_pressure: number;
  recommended_pressure: number;
  tolerance: number;
  helmet_value_original: number;
  helmet_value_revitalized: number;
  tire_model_variation_use: string[];
  logo: undefined;
  image: undefined;
  tire_model_variation_id: number;
}

const originalModelUpdateDefaultValues: OriginalModelUpdateDefaultValues = {
  data_sheet: null,
  tire_model_id: 0,
  name: "",
  tire_size_id: 0,
  brand_id: 0,
  tire_application_id: "",
  number_layers: 0,
  depth: 0,
  maximum_pressure: 0,
  recommended_pressure: 0,
  tolerance: 0,
  helmet_value_original: 0,
  helmet_value_revitalized: 0,
  tire_model_variation_use: [],
  logo: undefined,
  image: undefined,
  tire_model_variation_id: 0,
};