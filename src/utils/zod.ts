import { z } from "zod";

export { optionalNumber, optionalString };

const optionalNumber = z
  .union([z.number(), z.string()])
  .transform((val, ctx) => {
    if (typeof val === "number") {
      return val;
    }
    if (typeof val === "string") {
      if (val.length === 0) {
        return undefined;
      }
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          expected: z.ZodParsedType.number,
          received: z.ZodParsedType.string,
        });
        return z.NEVER;
      }
      return parsed;
    }
  });

const optionalString = z.any().transform((val, _ctx) => {
  if (val === undefined || val === null) {
    return undefined;
  }
  const parsed = `${val}`;
  if (parsed.length === 0) {
    return undefined;
  }
  return parsed;
});
