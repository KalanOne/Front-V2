import { z } from "zod";

export { alertFilterSchema, alertFilterDefaultValues };
export type { AlertFilterSchemaType };

const alertFilterSchema = z.object({
  status: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
});

type AlertFilterSchemaType = z.infer<typeof alertFilterSchema>;

interface AlertFilterDefaultValues {
  status: string;
  dateTo: string;
  dateFrom: string;
}

const alertFilterDefaultValues: AlertFilterDefaultValues = {
  status: "",
  dateTo: "",
  dateFrom: "",
};
