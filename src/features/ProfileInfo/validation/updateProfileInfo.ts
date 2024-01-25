import { z } from "zod";

export { profileInfoUpdateSchema, profileInfoUpdateDefaultValues };
export type { ProfileInfoUpdateSchemaType };

const profileInfoUpdateSchema = z
  .object({
    password: z.coerce.string(),
    passwordConfirmation: z.coerce.string(),
    preferred_language: z.string().min(2, "Preferred language is required"),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.passwordConfirmation) {
      ctx.addIssue({
        path: ["passwordConfirmation"],
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
      });
    }
  });

type ProfileInfoUpdateSchemaType = z.infer<typeof profileInfoUpdateSchema>;

interface ProfileInfoUpdateDefaultValues {
  password: string;
  passwordConfirmation: string;
  preferred_language: string;
}

const profileInfoUpdateDefaultValues: ProfileInfoUpdateDefaultValues = {
  password: "",
  passwordConfirmation: "",
  preferred_language: "",
};
