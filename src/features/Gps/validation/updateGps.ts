import { z } from "zod";

export { gpsUpdateSchema, gpsUpdateDefaultValues };
export type { GpsUpdateSchemaType };

const gpsUpdateSchema = z.object({
  device_name: z.string().min(1, "Name is required"),
  imei: z.string().min(1, "Imei is required"),
  subsidiary_id: z.coerce.number().gte(1, "Subsidiary is required"),
});

type GpsUpdateSchemaType = z.infer<typeof gpsUpdateSchema>;

interface GpsUpdateDefaultValues {
  device_name: string;
  imei: string;
  subsidiary_id: number;
}

const gpsUpdateDefaultValues: GpsUpdateDefaultValues = {
  device_name: "",
  imei: "",
  subsidiary_id: 0,
};
