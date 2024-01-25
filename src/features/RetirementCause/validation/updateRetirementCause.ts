import { z } from "zod";

export { causeUpdateSchema, causeUpdateDefaultValues };
export type { CauseUpdateSchemaType };

const causeUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
});

type CauseUpdateSchemaType = z.infer<typeof causeUpdateSchema>;

interface CauseUpdateDefaultValues {
  name: string;
  description: string;
}

const causeUpdateDefaultValues: CauseUpdateDefaultValues = {
  name: "",
  description: "",
};
