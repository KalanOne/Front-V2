import { z } from "zod";

export {
  revitalizedTireModelFilterSchema,
  revitalizedTireModelFilterDefaultValues,
};
export type { RevitalizedTireModelFilterSchemaType };

const revitalizedTireModelFilterSchema = z.object({
  status: z.string(),
  approved: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  revitalized_tire_model_id: z.coerce.string(),
});

type RevitalizedTireModelFilterSchemaType = z.infer<
  typeof revitalizedTireModelFilterSchema
>;

interface RevitalizedTireModelFilterDefaultValues {
  status: string;
  approved: string;
  dateTo: string;
  dateFrom: string;
  revitalized_tire_model_id: string;
}

const revitalizedTireModelFilterDefaultValues: RevitalizedTireModelFilterDefaultValues =
  {
    status: "",
    approved: "",
    dateTo: "",
    dateFrom: "",
    revitalized_tire_model_id: "",
  };
