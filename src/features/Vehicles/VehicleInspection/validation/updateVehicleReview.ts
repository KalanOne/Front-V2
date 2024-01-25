import { z } from "zod";

export { updateVehicleReviewSchema, updateVehicleReviewDefaultValues };
export type { UpdateVehicleReviewSchemaType };

const updateVehicleReviewSchema = z.object({
  date: z.string().min(1),
  observation: z.string(),
  odometer: z.coerce.number().min(1),
});

type UpdateVehicleReviewSchemaType = z.infer<typeof updateVehicleReviewSchema>;

interface UpdateVehicleReviewDefaultValues {
  date: string;
  observation: string;
  odometer: string;
}

const updateVehicleReviewDefaultValues: UpdateVehicleReviewDefaultValues = {
  date: "",
  observation: "",
  odometer: "",
};
