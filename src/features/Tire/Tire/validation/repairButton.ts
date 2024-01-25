import { z } from "zod";

export { repairButtonSchema, repairButtonDefaultValues };
export type { RepairButtonSchemaType };

const repairButtonSchema = z.object({
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

type RepairButtonSchemaType = z.infer<typeof repairButtonSchema>;

interface RepairButtonDefaultValues {
  damages: {
    damage_id: string;
    comment: string;
    image: File | null;
  }[];
  provider_id: string;
  date: string;
}

const repairButtonDefaultValues: RepairButtonDefaultValues = {
  damages: [],
  provider_id: "",
  date: "",
};
