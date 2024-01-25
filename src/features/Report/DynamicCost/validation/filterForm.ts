import { z } from "zod";

import { optionalNumber } from "src/utils/zod";

export { dynamicCostFilterSchema, dynamicCostFilterDefaultValues };
export type { DynamicCostFilterSchemaType, DynamicCostFilterInputType };

const dynamicCostFilterSchema = z.object({
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
  price: z.coerce.number(),
  helmet_value: z.coerce.number(),
  cycle: optionalNumber,
});

type DynamicCostFilterSchemaType = z.infer<typeof dynamicCostFilterSchema>;

type DynamicCostFilterInputType = z.input<typeof dynamicCostFilterSchema>;

const dynamicCostFilterDefaultValues: DynamicCostFilterInputType = {
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
  cycle: "",
};
