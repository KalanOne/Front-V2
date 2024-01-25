import { z } from "zod";

export { historyFilterSchema, historyFilterDefaultValues };
export type { HistoryFilterSchemaType };

const historyFilterSchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
  movement: z.string(),
  number_cycle: z.coerce.number(),
  tire_condition_id: z.coerce.string(),
  warehouses: z.coerce.string(),
  providers: z.coerce.string(),
  vehicles: z.coerce.string(),
});

type HistoryFilterSchemaType = z.infer<typeof historyFilterSchema>;

interface HistoryFilterDefaultValues {
  dateFrom: string;
  dateTo: string;
  movement: string;
  number_cycle: number;
  tire_condition_id: string;
  warehouses: string;
  providers: string;
  vehicles: string;
}

const historyFilterDefaultValues: HistoryFilterDefaultValues = {
  dateFrom: "",
  dateTo: "",
  movement: "",
  number_cycle: 0,
  tire_condition_id: "",
  warehouses: "",
  providers: "",
  vehicles: "",
};
