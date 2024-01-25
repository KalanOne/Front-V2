import { z } from "zod";

export { corporateUpdateSchema, corporateUpdateDefaultValues };
export type { CorporateUpdateSchemaType };

const corporateUpdateSchema = z.object({
  logo: z.any(),
  name: z.string().min(1, "Name is required"),
  social_reason: z.string().min(1, "Social reason is required"),
  rfc: z.string().min(1, "RFC is required"),
  tire_fee: z.coerce.number().gte(1, "Tire fee is required"),
  fee_currency_type: z.string().min(1, "Fee currency type is required"),
});

type CorporateUpdateSchemaType = z.infer<typeof corporateUpdateSchema>;

interface CorporateUpdateDefaultValues {
  logo: File | null;
  name: string;
  social_reason: string;
  rfc: string;
  tire_fee: number;
  fee_currency_type: string;
}

const corporateUpdateDefaultValues: CorporateUpdateDefaultValues = {
  logo: null,
  name: "",
  social_reason: "",
  rfc: "",
  tire_fee: 0,
  fee_currency_type: "",
};
