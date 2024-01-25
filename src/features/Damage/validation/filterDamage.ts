import { z } from "zod";

export { damageFilterSchema, damageFilterDefaultValues };
export type { DamageFilterSchemaType };

const damageFilterSchema = z.object({
  status: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
});

type DamageFilterSchemaType = z.infer<typeof damageFilterSchema>;

interface DamageFilterDefaultValues {
  status: string;
  dateTo: string;
  dateFrom: string;
}

const damageFilterDefaultValues: DamageFilterDefaultValues = {
  status: "",
  dateTo: "",
  dateFrom: "",
};
