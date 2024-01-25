import { z } from "zod";

export {
  subsidiaryHelmetValueCreateSchema,
  subsidiaryHelmetValueCreateDefaultValues,
};
export type { SubsidiaryHelmetValueCreateSchemaType };

const subsidiaryHelmetValueCreateSchema = z.object({
  tire_model_id: z.coerce.number().min(1),
  tire_model_variation_id: z.coerce.string().min(1),
  helmet_value_original: z.coerce.number().min(10),
  helmet_value_revitalized: z.coerce.number().min(10),
});

type SubsidiaryHelmetValueCreateSchemaType = z.infer<
  typeof subsidiaryHelmetValueCreateSchema
>;

interface SubsidiaryHelmetValueCreateDefaultValues {
  tire_model_id: string;
  tire_model_variation_id: string;
  helmet_value_original: string;
  helmet_value_revitalized: string;
}

const subsidiaryHelmetValueCreateDefaultValues: SubsidiaryHelmetValueCreateDefaultValues =
  {
    tire_model_id: "",
    tire_model_variation_id: "",
    helmet_value_original: "",
    helmet_value_revitalized: "",
  };
