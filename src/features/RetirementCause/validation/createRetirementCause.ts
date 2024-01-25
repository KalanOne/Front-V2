import { z } from "zod";


export { causeCreateSchema, causeCreateDefaultValues };
export type { CauseCreateSchemaType };

const causeCreateSchema = z.object({
  name: z.string().min(1,"Name is required"),
  description: z.string(),
});

type CauseCreateSchemaType = z.infer<typeof causeCreateSchema>;

interface CauseCreateDefaultValues {
  name: string;
  description: string;
}

const causeCreateDefaultValues: CauseCreateDefaultValues = {
  name: "",
  description: "",
};