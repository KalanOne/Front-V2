import { z } from "zod";

export { vehiclesExcelSchema, vehiclesExcelDefaultValues };
export type { VehiclesExcelSchemaType };

const vehiclesExcelSchema = z.object({
  excel: z.any(),
});

type VehiclesExcelSchemaType = z.infer<typeof vehiclesExcelSchema>;

interface VehiclesExcelDefaultValues {
  excel: File | null;
}

const vehiclesExcelDefaultValues: VehiclesExcelDefaultValues = {
  excel: null,
};
