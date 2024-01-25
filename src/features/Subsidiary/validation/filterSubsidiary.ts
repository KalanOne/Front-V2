import { z } from "zod";


export { subsidiaryFilterSchema, subsidiaryFilterDefaultValues };
export type { SubsidiaryFilterSchemaType };

const subsidiaryFilterSchema = z.object({
  status: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  company_id: z.coerce.string().array(),
});

type SubsidiaryFilterSchemaType = z.infer<typeof subsidiaryFilterSchema>;

interface SubsidiaryFilterDefaultValues {
  status: string;
  dateFrom: string;
  dateTo: string;
  company_id: string[];
}

const subsidiaryFilterDefaultValues: SubsidiaryFilterDefaultValues = {
  status: "",
  dateTo: "",
  dateFrom: "",
  company_id: [],
};