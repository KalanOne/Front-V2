import { z } from "zod";

import { optionalNumber } from "src/utils/zod";

export { kmPileFilterSchema, kmPileFilterDefaultValues };
export type { KmPileFilterSchemaType, KmPileFilterInputType };

const kmPileFilterSchema = z.object({
  date_from: z.string(),
  date_to: z.string(),
  corporate_id: optionalNumber,
  companies: z.coerce.number().array(),
  subsidiaries: z.coerce.number().array(),
  tire_condition: z.string().array(),
  tire_application: z.string().array(),
  price: optionalNumber,
  helmet_value: optionalNumber,
  brands: z.coerce.number().array(),
  models: z.coerce.number().array(),
  sizes: z.coerce.number().array(),
});

type KmPileFilterSchemaType = z.infer<typeof kmPileFilterSchema>;

type KmPileFilterInputType = z.input<typeof kmPileFilterSchema>;

const kmPileFilterDefaultValues: KmPileFilterInputType = {
  date_from: "",
  date_to: "",
  corporate_id: "",
  companies: [],
  subsidiaries: [],
  tire_condition: [],
  tire_application: [],
  price: "",
  helmet_value: "",
  brands: [],
  models: [],
  sizes: [],
};

// subsidiaries: 15,14
// companies: 5,6
// corporate_id: 7
// date_from: 2024-01-01
// date_to: 2024-01-26
// tire_condition: ORIGINAL_USED,ORIGINAL_NEW,RETREAD_NEW,RETREAD_USED
// tire_application: DIRECTIONAL,ALL_POSITION,TRACTION,TRAILER
// helmet_value: 122
// price: 122
