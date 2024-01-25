import { z } from "zod";

export { companyUpdateSchema, companyUpdateDefaultValues };
export type { CompanyUpdateSchemaType };

const companyUpdateSchema = z.object({
  logo: z.any(),
  name: z.string().min(1, "Name is required"),
  corporate_id: z.coerce.number().gte(1, "Corporate is required"),
  social_reason: z.string().min(1, "Social reason is required"),
  rfc: z.string().min(1, "RFC is required"),
  tire_fee: z.coerce.number().gte(1, "Tire fee is required"),
  fee_currency_type: z.string().min(1, "Fee currency type is required"),
});

type CompanyUpdateSchemaType = z.infer<typeof companyUpdateSchema>;

interface CompanyUpdateDefaultValues {
  logo: File | null;
  name: string;
  corporate_id: number;
  social_reason: string;
  rfc: string;
  tire_fee: number;
  fee_currency_type: string;
}

const companyUpdateDefaultValues: CompanyUpdateDefaultValues = {
  logo: null,
  name: "",
  corporate_id: 0,
  social_reason: "",
  rfc: "",
  tire_fee: 0,
  fee_currency_type: "",
};
