import { z } from "zod";


export { companyFilterSchema, companyFilterDefaultValues };
export type { CompanyFilterSchemaType };

const companyFilterSchema = z.object({
  status: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  corporate_id: z.coerce.string().array(),
});

type CompanyFilterSchemaType = z.infer<typeof companyFilterSchema>;

interface CompanyFilterDefaultValues {
  status: string;
  dateTo: string;
  dateFrom: string;
  corporate_id: string[];
}

const companyFilterDefaultValues: CompanyFilterDefaultValues = {
  status: "",
  dateTo: "",
  dateFrom: "",
  corporate_id: [],
};