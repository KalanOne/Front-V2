import { z } from "zod";

export { providerFilterSchema, providerFilterDefaultValues };
export type { ProviderFilterSchemaType };

const providerFilterSchema = z.object({
  status: z.string(),
  subsidiary_id: z.coerce.string().array(),
});

type ProviderFilterSchemaType = z.infer<typeof providerFilterSchema>;

interface ProviderFilterDefaultValues {
  status: string;
  subsidiary_id: string[];
}

const providerFilterDefaultValues: ProviderFilterDefaultValues = {
  status: "",
  subsidiary_id: [],
};
