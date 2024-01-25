import { z } from "zod";

export {
  subsidiaryHelmetValueFilterSchema,
  subsidiaryHelmetValueFilterDefaultValues,
};
export type { SubsidiaryHelmetValueFilterSchemaType };

const subsidiaryHelmetValueFilterSchema = z.object({
  tire_model: z.coerce.string().min(1),
  tire_model_variation: z.coerce.string().min(1),
});

type SubsidiaryHelmetValueFilterSchemaType = z.infer<
  typeof subsidiaryHelmetValueFilterSchema
>;

interface SubsidiaryHelmetValueFilterDefaultValues {
  tire_model: string;
  tire_model_variation: string;
}

const subsidiaryHelmetValueFilterDefaultValues: SubsidiaryHelmetValueFilterDefaultValues =
  {
    tire_model: "",
    tire_model_variation: "",
  };
