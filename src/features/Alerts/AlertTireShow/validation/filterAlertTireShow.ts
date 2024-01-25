import { z } from "zod";

export { alertTireShowFilterSchema, alertTireShowFilterDefaultValues };
export type { AlertTireShowFilterSchemaType };

const alertTireShowFilterSchema = z.object({
  date_from: z.coerce.string(),
  date_to: z.coerce.string(),
  ranking_alert: z.coerce.string(),
});

type AlertTireShowFilterSchemaType = z.infer<typeof alertTireShowFilterSchema>;

interface AlertTireShowFilterDefaultValues {
  date_from: string;
  date_to: string;
  ranking_alert: string;
}

const alertTireShowFilterDefaultValues: AlertTireShowFilterDefaultValues = {
  date_from: "",
  date_to: "",
  ranking_alert: "",
};
