import { z } from "zod";

export {
  vehicleReviewMovementFilterSchema,
  vehicleReviewMovementFilterDefaultValues,
};
export type { VehicleReviewMovementFilterSchemaType };

const vehicleReviewMovementFilterSchema = z.object({
  date_from: z.string(),
  date_to: z.string(),
  review_type: z.coerce.string().array(),
});

type VehicleReviewMovementFilterSchemaType = z.infer<
  typeof vehicleReviewMovementFilterSchema
>;

interface VehicleReviewMovementFilterDefaultValues {
  date_from: string;
  date_to: string;
  review_type: string[];
}

const vehicleReviewMovementFilterDefaultValues: VehicleReviewMovementFilterDefaultValues =
  {
    date_from: "",
    date_to: "",
    review_type: [],
  };
