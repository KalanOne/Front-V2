import { z } from "zod";

export { providerUpdateSchema, providerUpdateDefaultValues };
export type { ProviderUpdateSchemaType };

const providerUpdateSchema = z.object({
  rfc: z.string().min(1, "Rfc is required"),
  subsidiary_id: z.coerce.number().gte(1, "Subsidiary is required"),
  name: z.string().min(1, "Name is required"),
  observation: z.string(),
});

type ProviderUpdateSchemaType = z.infer<typeof providerUpdateSchema>;

interface ProviderUpdateDefaultValues {
  rfc: string;
  subsidiary_id: number;
  name: string;
  observation: string;
}

const providerUpdateDefaultValues: ProviderUpdateDefaultValues = {
  rfc: "",
  subsidiary_id: 0,
  name: "",
  observation: "",
};
