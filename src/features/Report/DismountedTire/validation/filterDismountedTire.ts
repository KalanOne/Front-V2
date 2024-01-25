import { z } from "zod";

import { optionalNumber } from "src/utils/zod";

export { dismountedTireFilterSchema, dismountedTireFilterDefaultValues };
export type { DismountedTireFilterSchemaType, DismountedTireFilterInputType };

const dismountedTireFilterSchema = z.object({
  date_from: z.string(),
  date_to: z.string(),
  corporate_id: optionalNumber,
  companies: z.coerce.number().array(),
  subsidiaries: z.coerce.number().array(),
  warehouses: z.coerce.number().array(),
});

type DismountedTireFilterSchemaType = z.infer<
  typeof dismountedTireFilterSchema
>;

type DismountedTireFilterInputType = z.input<
  typeof dismountedTireFilterSchema
>;

const dismountedTireFilterDefaultValues: DismountedTireFilterInputType = {
  date_from: "",
  date_to: "",
  corporate_id: "",
  companies: [],
  subsidiaries: [],
  warehouses: [],
};
