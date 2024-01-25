import { z } from "zod";

export { vehicleReviewUpdateSchema, vehicleReviewUpdateDefaultValues };
export type { VehicleReviewUpdateSchemaType };

const vehicleReviewUpdateSchema = z.object({
  odometer: z.coerce.number().min(1),
});

type VehicleReviewUpdateSchemaType = z.infer<typeof vehicleReviewUpdateSchema>;

interface VehicleReviewUpdateDefaultValues {
  odometer: string;
}

const vehicleReviewUpdateDefaultValues: VehicleReviewUpdateDefaultValues = {
  odometer: "",
};
