import { z } from "zod";

import { optionalNumber } from "src/utils/zod";

export { tireRetreadFilterSchema, tireRetreadFilterDefaultValues };
export type { TireRetreadFilterSchemaType, TireRetreadFilterInputType };

const tireRetreadFilterSchema = z.object({
  date_from: z.string(),
  date_to: z.string(),
  corporate_id: optionalNumber,
  companies: z.coerce.number().array(),
  subsidiaries: z.coerce.number().array(),
  providers: z.coerce.number().array(),
});

type TireRetreadFilterSchemaType = z.infer<typeof tireRetreadFilterSchema>;

type TireRetreadFilterInputType = z.input<typeof tireRetreadFilterSchema>;

const tireRetreadFilterDefaultValues: TireRetreadFilterInputType = {
  date_from: "",
  date_to: "",
  corporate_id: "",
  companies: [],
  subsidiaries: [],
  providers: [],
};
