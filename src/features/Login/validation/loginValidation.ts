import { z } from "zod";

export { loginSchema, loginDefaultValues };
export type { LoginSchemaType, LoginDefaultValuesType };

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const loginDefaultValues = {
  email: "",
  password: "",
};

interface LoginDefaultValuesType {
  email: string;
  password: string;
}
