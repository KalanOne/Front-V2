import { z } from "zod";


export { damageUpdateSchema, damageUpdateDefaultValues };
export type { DamageUpdateSchemaType };

const damageUpdateSchema = z.object({
  image: z.any(),
  name: z.string().min(1, "Name is required"),
  appearance: z.string(),
  probable_causes: z.string(),
  operation: z.string(),
  action_vehicle: z.string(),
  action_tire: z.string(),
  damage_category: z.string().min(1, "Damage category is required"),
  area: z.string().min(1, "Area is required"),
  lock_cycles: z.boolean(),
});

type DamageUpdateSchemaType = z.infer<typeof damageUpdateSchema>;

interface DamageUpdateDefaultValues {
  image: File | null;
  name: string;
  appearance: string;
  probable_causes: string;
  operation: string;
  action_vehicle: string;
  action_tire: string;
  damage_category: string;
  area: string;
  lock_cycles: boolean;
}

const damageUpdateDefaultValues: DamageUpdateDefaultValues = {
  image: null,
  name: "",
  appearance: "",
  probable_causes: "",
  operation: "",
  action_vehicle: "",
  action_tire: "",
  damage_category: "",
  area: "",
  lock_cycles: false,
};