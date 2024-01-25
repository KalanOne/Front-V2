import { z } from "zod";


export { brandUpdateSchema, brandUpdateDefaultValues };
export type { BrandUpdateSchemaType };

const brandUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brandType: z.string().min(1, "Brand Type is required"),
});

type BrandUpdateSchemaType = z.infer<typeof brandUpdateSchema>;

interface BrandUpdateDefaultValues {
  name: string;
  brandType: string;
}

const brandUpdateDefaultValues: BrandUpdateDefaultValues = {
  name: "",
  brandType: "",
};