import { z } from "zod";

import { optionalNumber } from "src/utils/zod";

export { damageWearFilterSchema, damageWearFilterDefaultValues };
export type { DamageWearFilterSchemaType, DamageWearFilterInputType };

const damageWearFilterSchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
  corporate_id: optionalNumber,
  companies: z.number().array(),
  subsidiaries: z.number().array(),
});

type DamageWearFilterSchemaType = z.infer<typeof damageWearFilterSchema>;

type DamageWearFilterInputType = z.input<typeof damageWearFilterSchema>;

const damageWearFilterDefaultValues: DamageWearFilterInputType = {
  dateFrom: "",
  dateTo: "",
  corporate_id: "",
  companies: [],
  subsidiaries: [],
};
