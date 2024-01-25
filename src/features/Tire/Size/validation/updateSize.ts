import { z } from "zod";

export { sizeUpdateSchema, sizeUpdateDefaultValues };
export type { SizeUpdateSchemaType };

const sizeUpdateSchema = z.object({
  size: z.string().min(1, "Size is required"),
});

type SizeUpdateSchemaType = z.infer<typeof sizeUpdateSchema>;

interface SizeUpdateDefaultValues {
  size: string;
}

const sizeUpdateDefaultValues: SizeUpdateDefaultValues = {
  size: "",
};
