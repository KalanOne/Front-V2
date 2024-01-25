import { z } from "zod";

export { mountingShowFilterSchema, mountingShowFilterDefaultValues };
export type { MountingShowFilterSchemaType };

const mountingShowFilterSchema = z.object({
  date_from: z.coerce.string(),
  date_to: z.coerce.string(),
  ranking_alert: z.coerce.string(),
});

type MountingShowFilterSchemaType = z.infer<typeof mountingShowFilterSchema>;

interface MountingShowFilterDefaultValues {
  date_from: string;
  date_to: string;
  ranking_alert: string;
}

const mountingShowFilterDefaultValues: MountingShowFilterDefaultValues = {
  date_from: "",
  date_to: "",
  ranking_alert: "",
};
