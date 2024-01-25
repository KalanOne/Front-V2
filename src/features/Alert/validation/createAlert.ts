import { z } from "zod";

export { alertCreateSchema, alertCreateDefaultValues };
export type { AlertCreateSchemaType };

const alertCreateSchema = z.object({
  code: z.string().min(1, "Code is required"),
  alert_type: z.string().min(1, "Alert type is required"),
  ranking_alert: z.string().min(1, "Ranking alert is required"),
  priority: z.string().min(1, "Priority is required"),
  details: z.string().min(1, "Details is required"),
  suggestion: z.string(),
});

type AlertCreateSchemaType = z.infer<typeof alertCreateSchema>;

interface AlertCreateDefaultValues {
  code: string;
  alert_type: string;
  ranking_alert: string;
  priority: string;
  details: string;
  suggestion: string;
}

const alertCreateDefaultValues: AlertCreateDefaultValues = {
  code: "",
  alert_type: "",
  ranking_alert: "",
  priority: "",
  details: "",
  suggestion: "",
};
