import { z } from "zod";

import { optionalNumber } from "src/utils/zod";

export { semaphoreFilterSchema, semaphoreFilterDefaultValues };
export type { SemaphoreFilterSchemaType, SemaphoreFilterInputType };

const semaphoreFilterSchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
  corporate_id: optionalNumber,
  companies: z.number().array(),
});

type SemaphoreFilterSchemaType = z.infer<typeof semaphoreFilterSchema>;

type SemaphoreFilterInputType = z.input<typeof semaphoreFilterSchema>;

const semaphoreFilterDefaultValues: SemaphoreFilterInputType = {
  dateFrom: "",
  dateTo: "",
  corporate_id: "",
  companies: [],
};
