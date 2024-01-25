import { z } from "zod";

export { wearFilterSchema, wearFilterDefaultValues };
export type { WearFilterSchemaType };

const wearFilterSchema = z.object({
  status: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
});

type WearFilterSchemaType = z.infer<typeof wearFilterSchema>;

interface WearFilterDefaultValues {
  status: string;
  dateTo: string;
  dateFrom: string;
}

const wearFilterDefaultValues: WearFilterDefaultValues = {
  status: "",
  dateTo: "",
  dateFrom: "",
};
