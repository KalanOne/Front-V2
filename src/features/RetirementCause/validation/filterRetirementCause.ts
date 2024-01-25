import { z } from "zod";

export { causeFilterSchema, causeFilterDefaultValues };
export type { CauseFilterSchemaType };

const causeFilterSchema = z.object({
  status: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
});

type CauseFilterSchemaType = z.infer<typeof causeFilterSchema>;

interface CauseFilterDefaultValues {
  status: string;
  dateTo: string;
  dateFrom: string;
}

const causeFilterDefaultValues: CauseFilterDefaultValues = {
  status: "",
  dateTo: "",
  dateFrom: "",
};
