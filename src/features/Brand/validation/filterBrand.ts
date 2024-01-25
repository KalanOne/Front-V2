import { z } from "zod";

export { brandFilterSchema, brandFilterDefaultValues };
export type { BrandFilterSchemaType };

const brandFilterSchema = z.object({
  status: z.string(),
  approved: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  brandType: z.array(z.string()),
});

type BrandFilterSchemaType = z.infer<typeof brandFilterSchema>;

interface BrandFilterDefaultValues {
  brandType: string[];
  status: string;
  approved: string;
  dateTo: string;
  dateFrom: string;
}

const brandFilterDefaultValues: BrandFilterDefaultValues = {
  brandType: [],
  status: "",
  approved: "",
  dateTo: "",
  dateFrom: "",
};
