import { z } from "zod";

export { mountingShowUpdateSchema, mountingShowUpdateDefaultValues };
export type { MountingShowUpdateSchemaType };

const mountingShowUpdateSchema = z.object({
  alert_id: z.number(),
  comment: z.string({ description: "Comment is required" }),
  vehicle_tire_id: z.number(),
});

type MountingShowUpdateSchemaType = z.infer<typeof mountingShowUpdateSchema>;

interface MountingShowUpdateDefaultValues {
  alert_id: number;
  comment: string;
  vehicle_tire_id: number;
}

const mountingShowUpdateDefaultValues: MountingShowUpdateDefaultValues = {
  alert_id: 0,
  comment: "",
  vehicle_tire_id: 0,
};
