import { z } from "zod";

export { startVehicleReviewSchema, startVehicleReviewDefaultValues };
export type { StartVehicleReviewSchemaType };

const startVehicleReviewSchema = z.object({
  date: z.string().min(1),
  observation: z.string(),
  odometer: z.coerce.number().min(1),
  review_type: z.string().min(1),
});

type StartVehicleReviewSchemaType = z.infer<typeof startVehicleReviewSchema>;

interface StartVehicleReviewDefaultValues {
  date: string;
  observation: string;
  odometer: string;
  review_type: string;
}

const startVehicleReviewDefaultValues: StartVehicleReviewDefaultValues = {
  date: "",
  observation: "",
  odometer: "",
  review_type: "",
};
