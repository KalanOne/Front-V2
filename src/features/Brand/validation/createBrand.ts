import { z } from "zod";

export { brandCreateSchema, brandCreateDefaultValues };
export type { BrandCreateSchemaType };

const brandCreateSchema = z.object({
  name: z.string().min(1,"Name is required"),
  brandType: z.string().min(1,"Brand Type is required"),
});

type BrandCreateSchemaType = z.infer<typeof brandCreateSchema>;

interface BrandCreateDefaultValues {
  name: string;
  brandType: string;
}

const brandCreateDefaultValues: BrandCreateDefaultValues = {
  name: "",
  brandType: "",
};
