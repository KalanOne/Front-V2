import { z } from "zod";


export { alertUpdateSchema, alertUpdateDefaultValues };
export type { AlertUpdateSchemaType };

const alertUpdateSchema = z.object({
  code: z.string().min(1,"Code is required"),
  alert_type: z.string().min(1,"Alert type is required"),
  ranking_alert: z.string().min(1,"Ranking alert is required"),
  priority: z.string().min(1,"Priority is required"),
  details: z.string().min(1,"Details is required"),
  suggestion: z.string().min(1,"Suggestion is required"),
});

type AlertUpdateSchemaType = z.infer<typeof alertUpdateSchema>;

interface AlertUpdateDefaultValues {
  code: string;
  alert_type: string;
  ranking_alert: string;
  priority: string;
  details: string;
  suggestion: string;
}

const alertUpdateDefaultValues: AlertUpdateDefaultValues = {
  code: "",
  alert_type: "",
  ranking_alert: "",
  priority: "",
  details: "",
  suggestion: "",
};