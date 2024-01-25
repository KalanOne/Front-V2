import { z } from "zod";

export { tireExcelSchema, tireExcelDefaultValues };
export type { TireExcelSchemaType };

const tireExcelSchema = z.object({
  excel: z.any(),
});

type TireExcelSchemaType = z.infer<typeof tireExcelSchema>;

interface TireExcelDefaultValues {
  excel: File | null;
}

const tireExcelDefaultValues: TireExcelDefaultValues = {
  excel: null,
};
