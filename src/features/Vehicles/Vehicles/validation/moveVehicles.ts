import { z } from "zod";

export { vehiclesMoveSchema, vehiclesMoveDefaultValues };
export type { VehiclesMoveSchemaType };

const vehiclesMoveSchema = z.object({
  company_id: z.coerce.string().min(1),
  subsidiary_id: z.coerce.string().min(1),
});

type VehiclesMoveSchemaType = z.infer<typeof vehiclesMoveSchema>;

interface VehiclesMoveDefaultValues {
  company_id: string;
  subsidiary_id: string;
}

const vehiclesMoveDefaultValues: VehiclesMoveDefaultValues = {
  company_id: "",
  subsidiary_id: "",
};
