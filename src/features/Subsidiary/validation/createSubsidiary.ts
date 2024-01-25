import { z } from "zod";

export { subsidiaryCreateSchema, subsidiaryCreateDefaultValues };
export type { SubsidiaryCreateSchemaType };

const subsidiaryCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company_id: z.coerce.number().gte(1, "Company is required"),
  direction_1: z.string().min(1, "Direction_1 is required"),
  external_number: z.string().min(1, "External Number is required"),
  internal_number: z.string(),
  direction_2: z.string().min(1, "Direction_2 Number Name is required"),
  postal_code: z.string().min(1, "Postal Code is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  province: z.string().min(1, "Province is required"),
});

type SubsidiaryCreateSchemaType = z.infer<typeof subsidiaryCreateSchema>;

interface SubsidiaryCreateDefaultValues {
  name: string;
  company_id: number;
  direction_1: string;
  external_number: string;
  internal_number: string;
  direction_2: string;
  postal_code: string;
  country: string;
  state: string;
  province: string;
}

const subsidiaryCreateDefaultValues: SubsidiaryCreateDefaultValues = {
  name: "",
  company_id: 0,
  direction_1: "",
  external_number: "",
  internal_number: "",
  direction_2: "",
  postal_code: "",
  country: "",
  state: "",
  province: "",
};
