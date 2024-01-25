import { z } from "zod";

export { corporateFilterSchema, corporateFilterDefaultValues };
export type { CorporateFilterSchemaType };

const corporateFilterSchema = z.object({
  status: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
});

type CorporateFilterSchemaType = z.infer<typeof corporateFilterSchema>;

interface CorporateFilterDefaultValues {
  status: string;
  dateTo: string;
  dateFrom: string;
}

const corporateFilterDefaultValues: CorporateFilterDefaultValues = {
  status: "",
  dateTo: "",
  dateFrom: "",
};
