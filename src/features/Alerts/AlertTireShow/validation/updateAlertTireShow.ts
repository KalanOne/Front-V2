import { z } from "zod";

export { alertTireShowUpdateSchema, alertTireShowUpdateDefaultValues };
export type { AlertTireShowUpdateSchemaType };

const alertTireShowUpdateSchema = z.object({
  comment: z.string({ description: "Comment is required" }),
  alert_id: z.number(),
});

type AlertTireShowUpdateSchemaType = z.infer<typeof alertTireShowUpdateSchema>;

interface AlertTireShowUpdateDefaultValues {
  comment: string;
  alert_id: number;
}

const alertTireShowUpdateDefaultValues: AlertTireShowUpdateDefaultValues = {
  comment: "",
  alert_id: 0,
};
