import { z } from "zod";

export { damageButtonSchema, damageButtonDefaultValues };
export type { DamageButtonSchemaType };

const damageButtonSchema = z.object({
  // wears: z.array(
  //   z.object({
  //     wear_id: z.coerce.string().min(1, "Wear is required"),
  //     comment: z.coerce.string(),
  //     image: z.any(),
  //   }),
  // ),
  damages: z.array(
    z.object({
      damage_id: z.coerce.string().min(1, "Damage is required"),
      comment: z.coerce.string(),
      image: z.any(),
    }),
  ),
  // provider_id: z.coerce.string().min(1, "Provider is required"),
  // date: z.coerce.string().min(1, "Date is required"),
});

type DamageButtonSchemaType = z.infer<typeof damageButtonSchema>;

interface DamageButtonDefaultValues {
  // wears: {
  //   wear_id: string;
  //   comment: string;
  //   image: File | null;
  // }[];
  damages: {
    damage_id: string;
    comment: string;
    image: File | null;
  }[];
  // provider_id: string;
  // date: string;
}

const damageButtonDefaultValues: DamageButtonDefaultValues = {
  // wears: [],
  damages: [{ damage_id: "", comment: "", image: null }],
  // provider_id: "",
  // date: "",
};
