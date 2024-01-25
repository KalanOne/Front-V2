import { z } from "zod";

export { tireSendSchema, tireSendDefaultValues };
export type { TireSendSchemaType };

const tireSendSchema = z.object({
  company_id: z.coerce.string().min(1, "Company is required"),
  subsidiary_id: z.coerce.string().min(1, "Subsidiary is required"),
  warehouse_id: z.coerce.string().min(1, "Warehouse is required"),
});

type TireSendSchemaType = z.infer<typeof tireSendSchema>;

interface TireSendDefaultValues {
  company_id: string;
  subsidiary_id: string;
  warehouse_id: string;
}

const tireSendDefaultValues: TireSendDefaultValues = {
  company_id: "",
  subsidiary_id: "",
  warehouse_id: "",
};
