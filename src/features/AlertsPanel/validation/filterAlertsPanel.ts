import { z } from "zod";

import { optionalNumber } from "src/utils/zod";

export { alertsPanelFilterSchema, alertsPanelFilterDefaultValues };
export type { AlertsPanelFilterSchemaType, AlertsPanelFilterInputType };

const alertsPanelFilterSchema = z.object({
  date_from: z.string(),
  date_to: z.string(),
  corporate_id: optionalNumber,
  companies: z.coerce.number().array(),
  subsidiaries: z.coerce.number().array(),
  ranking_alert: z.string().array(),
  priority: z.string().array(),
  alert_codes: z.string().array(),
});

type AlertsPanelFilterSchemaType = z.infer<typeof alertsPanelFilterSchema>;

type AlertsPanelFilterInputType = z.input<typeof alertsPanelFilterSchema>;

const alertsPanelFilterDefaultValues: AlertsPanelFilterInputType = {
  date_from: "",
  date_to: "",
  corporate_id: "",
  companies: [],
  subsidiaries: [],
  ranking_alert: [],
  priority: [],
  alert_codes: [],
};
