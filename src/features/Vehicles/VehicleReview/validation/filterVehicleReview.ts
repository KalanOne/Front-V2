import { z } from "zod";

export { vehicleReviewFilterSchema, vehicleReviewFilterDefaultValues };
export type { VehicleReviewFilterSchemaType };

const vehicleReviewFilterSchema = z.object({
  date_from: z.string(),
  date_to: z.string(),
  subsidiaries: z.coerce.string().array(),
  vehicle_type_id: z.coerce.string(),
  vehicle_brand_id: z.coerce.string(),
  drivers: z.coerce.string(),
});

type VehicleReviewFilterSchemaType = z.infer<typeof vehicleReviewFilterSchema>;

interface VehicleReviewFilterDefaultValues {
  date_from: string;
  date_to: string;
  subsidiaries: string[];
  vehicle_type_id: string;
  vehicle_brand_id: string;
  drivers: string;
}

const vehicleReviewFilterDefaultValues: VehicleReviewFilterDefaultValues = {
  date_from: "",
  date_to: "",
  subsidiaries: [],
  vehicle_type_id: "",
  vehicle_brand_id: "",
  drivers: "",
};
