import { z } from "zod";

import { optionalNumber } from "src/utils/zod";

export { kmProjectionFilterSchema, kmProjectionFilterDefaultValues };
export type { KmProjectionFilterSchemaType, KmProjectionFilterInputType };

const kmProjectionFilterSchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
  corporate_id: optionalNumber,
  companies: z.number().array(),
  subsidiaries: z.number().array(),
  movement: z.string(),
  brand_id: optionalNumber,
  model_id: optionalNumber,
  size_id: optionalNumber,
  condition: z.string(),
  tire_application: z.string(),
  price: z.number(),
  helmet_value: z.number(),
});

type KmProjectionFilterSchemaType = z.infer<typeof kmProjectionFilterSchema>;

type KmProjectionFilterInputType = z.input<typeof kmProjectionFilterSchema>;

const kmProjectionFilterDefaultValues: KmProjectionFilterInputType = {
  dateFrom: "",
  dateTo: "",
  corporate_id: "",
  companies: [],
  subsidiaries: [],
  movement: "",
  brand_id: "",
  model_id: "",
  size_id: "",
  condition: "",
  tire_application: "",
  price: 0,
  helmet_value: 0,
};
