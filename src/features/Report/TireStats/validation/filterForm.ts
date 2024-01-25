import { z } from "zod";

import { optionalNumber } from "src/utils/zod";

export { tireStatsFilterSchema, tireStatsFilterDefaultValues };
export type { TireStatsFilterSchemaType, TireStatsFilterInputType };

const tireStatsFilterSchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
  corporate_id: optionalNumber,
  companies: z.number().array(),
  subsidiaries: z.number().array(),
  movement: z.string(),
  brand_id: optionalNumber,
  model_id: optionalNumber,
  size_id: optionalNumber,
  brandRetread_id: optionalNumber,
  modelRevitalized_id: optionalNumber,
  depth_min: z.number(),
  depth_max: z.number(),
  depth_condition: z.string(),
  review_type: z.string(),
  number_cycle: z.number(),
});

type TireStatsFilterSchemaType = z.infer<typeof tireStatsFilterSchema>;

type TireStatsFilterInputType = z.input<typeof tireStatsFilterSchema>;

const tireStatsFilterDefaultValues: TireStatsFilterInputType = {
  dateFrom: "",
  dateTo: "",
  corporate_id: "",
  companies: [],
  subsidiaries: [],
  movement: "",
  brand_id: "",
  model_id: "",
  size_id: "",
  brandRetread_id: "",
  modelRevitalized_id: "",
  depth_min: 0,
  depth_max: 0,
  depth_condition: "",
  review_type: "",
  number_cycle: 0,
};
