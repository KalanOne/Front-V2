import { z } from "zod";

export { sizeCreateSchema, sizeCreateDefaultValues };
export type { SizeCreateSchemaType };

const sizeCreateSchema = z.object({
  size: z.string().min(1, "Size is required"),
});

type SizeCreateSchemaType = z.infer<typeof sizeCreateSchema>;

interface SizeCreateDefaultValues {
  size: string;
}

const sizeCreateDefaultValues: SizeCreateDefaultValues = {
  size: "",
};
