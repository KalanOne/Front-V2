import { z } from "zod";

import { optionalNumber } from "src/utils/zod";

export { mountedTireFilterSchema, mountedTireFilterDefaultValues };
export type { MountedTireFilterSchemaType, MountedTireFilterInputType };

const mountedTireFilterSchema = z.object({
  date_from: z.string(),
  date_to: z.string(),
  corporate_id: optionalNumber,
  companies: z.coerce.number().array(),
  subsidiaries: z.coerce.number().array(),
  vehicle_types: z.coerce.number().array(),
});

type MountedTireFilterSchemaType = z.infer<typeof mountedTireFilterSchema>;

type MountedTireFilterInputType = z.input<typeof mountedTireFilterSchema>;

const mountedTireFilterDefaultValues: MountedTireFilterInputType = {
  date_from: "",
  date_to: "",
  corporate_id: "",
  companies: [],
  subsidiaries: [],
  vehicle_types: [],
};
