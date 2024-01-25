import { z } from "zod";

export { gpsFilterSchema, gpsFilterDefaultValues };
export type { GpsFilterSchemaType };

const gpsFilterSchema = z.object({
  status: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  subsidiary_id: z.coerce.string().array(),
});

type GpsFilterSchemaType = z.infer<typeof gpsFilterSchema>;

interface GpsFilterDefaultValues {
  status: string;
  dateTo: string;
  dateFrom: string;
  subsidiary_id: string[];
}

const gpsFilterDefaultValues: GpsFilterDefaultValues = {
  status: "",
  dateTo: "",
  dateFrom: "",
  subsidiary_id: [],
};
