import { z } from "zod";

export { discardButtonSchema, discardButtonDefaultValues };
export type { DiscardButtonSchemaType };

const discardButtonSchema = z
  .object({
    retirement_cause_id: z.coerce.string().min(1, "Cause is required"),
    comment: z.coerce.string(),
    image: z.any(),
    cost_dispose_helmet: z.coerce.number().gte(1, "Cost is required"),
    surcharge: z.coerce.number(),
    driver_id: z.coerce.string().optional(),
    surcharge_item: z.coerce.string().optional(),
    damages: z.array(
      z.object({
        damage_id: z.coerce.string().min(1, "Damage is required"),
        comment: z.coerce.string(),
        image: z.any(),
      }),
    ),
  })
  .superRefine((val, ctx) => {
    if (val.surcharge > 0 && val.driver_id?.length === 0) {
      ctx.addIssue({
        path: ["driver_id"],
        code: z.ZodIssueCode.custom,
        message: "Driver is required",
      });
    }
    if (val.surcharge > 0 && val.surcharge_item?.length === 0) {
      ctx.addIssue({
        path: ["surcharge_item"],
        code: z.ZodIssueCode.custom,
        message: "Surcharge Item is required",
      });
    }
  });

type DiscardButtonSchemaType = z.infer<typeof discardButtonSchema>;

interface DiscardButtonDefaultValues {
  retirement_cause_id: string;
  comment: string;
  image: File | null;
  cost_dispose_helmet: string;
  surcharge: number;
  driver_id: string;
  surcharge_item: string;
  damages: {
    damage_id: string;
    comment: string;
    image: File | null;
  }[];
}

const discardButtonDefaultValues: DiscardButtonDefaultValues = {
  retirement_cause_id: "",
  comment: "",
  image: null,
  cost_dispose_helmet: "",
  surcharge: 0,
  driver_id: "",
  surcharge_item: "",
  damages: [],
};
