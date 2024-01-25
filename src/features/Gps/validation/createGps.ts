import { z } from "zod";


export { gpsCreateSchema, gpsCreateDefaultValues };
export type { GpsCreateSchemaType };

const gpsCreateSchema = z.object({
  device_name: z.string().min(1, "Name is required"),
  imei: z.string().min(1, "Imei is required"),
  subsidiary_id: z.coerce.number().gte(1, "Subsidiary is required"),
});

type GpsCreateSchemaType = z.infer<typeof gpsCreateSchema>;

interface GpsCreateDefaultValues {
  device_name: string;
  imei: string;
  subsidiary_id: number;
}

const gpsCreateDefaultValues: GpsCreateDefaultValues = {
  device_name: "",
  imei: "",
  subsidiary_id: 0,
};