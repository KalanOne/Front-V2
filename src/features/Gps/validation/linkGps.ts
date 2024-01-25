import { z } from "zod";

export { gpsLinkSchema, gpsLinkDefaultValues };
export type { GpsLinkSchemaType };

const gpsLinkSchema = z.object({
  vehicle_id: z.coerce.string().min(1, "Vehicle is required"),
});

type GpsLinkSchemaType = z.infer<typeof gpsLinkSchema>;

interface GpsLinkDefaultValues {
  vehicle_id: string;
}

const gpsLinkDefaultValues: GpsLinkDefaultValues = {
  vehicle_id: "",
};
