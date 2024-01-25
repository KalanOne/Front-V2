import { z } from "zod";

export { renewabilityFilterSchema, renewabilityFilterDefaultValues };
export type { RenewabilityFilterSchemaType };

const renewabilityFilterSchema = z.object({
  subsidiaries: z.coerce.string(),
  companies: z.coerce.string(),
  corporate_id: z.coerce.string(),
  models: z.coerce.string(),
  brands: z.coerce.string(),
  sizes: z.coerce.string(),
});

type RenewabilityFilterSchemaType = z.infer<typeof renewabilityFilterSchema>;

interface RenewabilityFilterDefaultValues {
  subsidiaries: string;
  companies: string;
  corporate_id: string;
  models: string;
  brands: string;
  sizes: string;
}

const renewabilityFilterDefaultValues: RenewabilityFilterDefaultValues = {
  subsidiaries: "",
  companies: "",
  corporate_id: "",
  models: "",
  brands: "",
  sizes: "",
};
