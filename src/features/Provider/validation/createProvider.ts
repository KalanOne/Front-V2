import { z } from "zod";

export { providerCreateSchema, providerCreateDefaultValues };
export type { ProviderCreateSchemaType };

const providerCreateSchema = z.object({
  rfc: z.string().min(1, "Rfc is required"),
  subsidiary_id: z.coerce.number().gte(1, "Subsidiary is required"),
  name: z.string().min(1, "Name is required"),
  observation: z.string(),
});

type ProviderCreateSchemaType = z.infer<typeof providerCreateSchema>;

interface ProviderCreateDefaultValues {
  rfc: string;
  subsidiary_id: number;
  name: string;
  observation: string;
}

const providerCreateDefaultValues: ProviderCreateDefaultValues = {
  rfc: "",
  subsidiary_id: 0,
  name: "",
  observation: "",
};
