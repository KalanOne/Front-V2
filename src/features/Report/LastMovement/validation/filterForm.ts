import { z } from "zod";

import { optionalNumber } from "src/utils/zod";

export { lastMovementFilterSchema, lastMovementFilterDefaultValues };
export type { LastMovementFilterSchemaType, LastMovementFilterInputType };

const lastMovementFilterSchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
  corporate_id: optionalNumber,
  companies: z.number().array(),
  subsidiaries: z.number().array(),
  brand_id: optionalNumber,
  model_id: optionalNumber,
  size_id: optionalNumber,
});

type LastMovementFilterSchemaType = z.infer<typeof lastMovementFilterSchema>;

type LastMovementFilterInputType = z.input<typeof lastMovementFilterSchema>;

const lastMovementFilterDefaultValues: LastMovementFilterInputType = {
  dateFrom: "",
  dateTo: "",
  corporate_id: "",
  companies: [],
  subsidiaries: [],
  brand_id: "",
  model_id: "",
  size_id: "",
};
