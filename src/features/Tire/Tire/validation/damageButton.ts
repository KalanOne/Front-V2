import { z } from "zod";

export { damageButtonSchema, damageButtonDefaultValues };
export type { DamageButtonSchemaType };

const damageButtonSchema = z.object({
  damages: z.array(
    z.object({
      damage_id: z.coerce.string().min(1, "Damage is required"),
      comment: z.coerce.string(),
      image: z.any(),
    }),
  ),
});

type DamageButtonSchemaType = z.infer<typeof damageButtonSchema>;

interface DamageButtonDefaultValues {
  damages: {
    damage_id: string;
    comment: string;
    image: File | null;
  }[];
}

const damageButtonDefaultValues: DamageButtonDefaultValues = {
  damages: [],
};
