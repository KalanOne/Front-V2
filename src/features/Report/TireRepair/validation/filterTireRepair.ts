import { z } from "zod";

import { optionalNumber } from "src/utils/zod";

export { tireRepairFilterSchema, tireRepairFilterDefaultValues };
export type { TireRepairFilterSchemaType, TireRepairFilterInputType };

const tireRepairFilterSchema = z.object({
  date_from: z.string(),
  date_to: z.string(),
  corporate_id: optionalNumber,
  companies: z.coerce.number().array(),
  subsidiaries: z.coerce.number().array(),
  providers: z.coerce.number().array(),
});

type TireRepairFilterSchemaType = z.infer<typeof tireRepairFilterSchema>;

type TireRepairFilterInputType = z.input<typeof tireRepairFilterSchema>;

const tireRepairFilterDefaultValues: TireRepairFilterInputType = {
  date_from: "",
  date_to: "",
  corporate_id: "",
  companies: [],
  subsidiaries: [],
  providers: [],
};
