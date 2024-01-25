import { z } from "zod";

import { optionalNumber } from "src/utils/zod";

export { summaryFilterSchema, summaryFilterDefaultValues };
export type { SummaryFilterSchemaType, SummaryFilterInputType };

const summaryFilterSchema = z.object({
  date_from: z.string(),
  date_to: z.string(),
  corporate_id: optionalNumber,
  companies: optionalNumber,
  subsidiaries: z.coerce.number().array(),
  movement: z.string(),
  depth_condition: z.string(),
  pressure_condition: z.string(),
  activity: z.string(),
  review_type: z.string(),
  with_refection: z.boolean(),
  number_cycle: optionalNumber,
});

type SummaryFilterSchemaType = z.infer<typeof summaryFilterSchema>;

type SummaryFilterInputType = z.input<typeof summaryFilterSchema>;

const summaryFilterDefaultValues: SummaryFilterInputType = {
  date_from: "",
  date_to: "",
  corporate_id: "",
  companies: "",
  subsidiaries: [],
  movement: "",
  pressure_condition: "",
  depth_condition: "",
  activity: "",
  review_type: "",
  with_refection: false,
  number_cycle: "",
};

// movement: MOUNT
// subsidiaries: 15,14
// companies: 6
// corporate_id: 7
// date_from: 2024-01-12
// date_to: 2024-01-18
// with_refection: 1
// depth_condition: SCHEDULED+WITHDRAWAL
// pressure_condition: NO+PRESSURE
// activity: GENERAL
// review_type: PRESSURE
// number_cycle: 5
