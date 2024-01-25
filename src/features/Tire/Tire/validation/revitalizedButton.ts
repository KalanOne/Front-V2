import { z } from "zod";

export { revitalizedButtonSchema, revitalizedButtonDefaultValues };
export type { RevitalizedButtonSchemaType };

const revitalizedButtonSchema = z.object({
  wears: z.array(
    z.object({
      wear_id: z.coerce.string().min(1, "Wear is required"),
      comment: z.coerce.string(),
      image: z.any(),
    }),
  ),
  damages: z.array(
    z.object({
      damage_id: z.coerce.string().min(1, "Damage is required"),
      comment: z.coerce.string(),
      image: z.any(),
    }),
  ),
  provider_id: z.coerce.string().min(1, "Provider is required"),
  date: z.coerce.string().min(1, "Date is required"),
});

type RevitalizedButtonSchemaType = z.infer<typeof revitalizedButtonSchema>;

interface RevitalizedButtonDefaultValues {
  wears: {
    wear_id: string;
    comment: string;
    image: File | null;
  }[];
  damages: {
    damage_id: string;
    comment: string;
    image: File | null;
  }[];
  provider_id: string;
  date: string;
}

const revitalizedButtonDefaultValues: RevitalizedButtonDefaultValues = {
  wears: [],
  damages: [],
  provider_id: "",
  date: "",
};
