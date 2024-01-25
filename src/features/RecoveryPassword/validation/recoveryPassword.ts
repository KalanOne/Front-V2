import { z } from "zod";

export { recoveryPasswordSchema, recoveryPasswordDefaultValues };
export type { RecoveryPasswordSchemaType, RecoveryPasswordDefaultValuesType };

const recoveryPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
});

type RecoveryPasswordSchemaType = z.infer<typeof recoveryPasswordSchema>;

const recoveryPasswordDefaultValues = {
  email: "",
};

interface RecoveryPasswordDefaultValuesType {
  email: string;
}
