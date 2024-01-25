import { z } from "zod";

export { vehicleShowFilterSchema, vehicleShowFilterDefaultValues };
export type { VehicleShowFilterSchemaType };

const vehicleShowFilterSchema = z.object({
  date_from: z.coerce.string(),
  date_to: z.coerce.string(),
  ranking_alert: z.coerce.string(),
});

type VehicleShowFilterSchemaType = z.infer<typeof vehicleShowFilterSchema>;

interface VehicleShowFilterDefaultValues {
  date_from: string;
  date_to: string;
  ranking_alert: string;
}

const vehicleShowFilterDefaultValues: VehicleShowFilterDefaultValues = {
  date_from: "",
  date_to: "",
  ranking_alert: "",
};
