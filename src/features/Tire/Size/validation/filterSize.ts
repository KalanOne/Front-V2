import { z } from "zod";

export { sizeFilterSchema, sizeFilterDefaultValues };
export type { SizeFilterSchemaType };

const sizeFilterSchema = z.object({
  status: z.string(),
  approved: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
});

type SizeFilterSchemaType = z.infer<typeof sizeFilterSchema>;

interface SizeFilterDefaultValues {
  status: string;
  approved: string;
  dateTo: string;
  dateFrom: string;
}

const sizeFilterDefaultValues: SizeFilterDefaultValues = {
  status: "",
  approved: "",
  dateTo: "",
  dateFrom: "",
};
