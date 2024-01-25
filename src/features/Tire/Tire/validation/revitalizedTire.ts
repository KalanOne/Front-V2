import { z } from "zod";

export { tireRevitalizedSchema, tireRevitalizedDefaultValues };
export type { TireRevitalizedSchemaType };

const tireRevitalizedSchema = z.object({
  code: z.string().min(1, "Code is required"),
  rfid_id: z.coerce.string(),
  warehouse_id: z.coerce.string().min(1, "Warehouse is required"),
  price: z.coerce.number().gte(1, "Price is required"),
  brand_id: z.coerce.string().min(1, "Brand is required"),
  revitalized_tire_model_id: z.coerce
    .string()
    .min(1, "Revitalized Model is required"),
  expected_durability: z.coerce.number(),
  depth: z.coerce.number().gte(1, "Depth is required"),
  date_return: z.coerce.string().min(1, "Date Return is required"),
  comment: z.string(),
  invoice_date: z.string(),
  invoice_folio: z.string(),
  similar_tires: z.coerce.number().gte(0, "Similar is required"),
  tires: z.array(
    z.object({
      code: z.string().min(1, "Code is required"),
      rfid_id: z.coerce.string(),
    }),
  ),
});

type TireRevitalizedSchemaType = z.infer<typeof tireRevitalizedSchema>;

interface TireRevitalizedDefaultValues {
  code: string;
  rfid_id: string;
  warehouse_id: string;
  price: number;
  brand_id: string;
  revitalized_tire_model_id: string;
  expected_durability: number;
  depth: number;
  date_return: string;
  comment: string;
  invoice_date: string;
  invoice_folio: string;
  similar_tires: number;
  tires: {
    code: string;
    rfid_id: string;
  }[];
}

const tireRevitalizedDefaultValues: TireRevitalizedDefaultValues = {
  code: "",
  rfid_id: "",
  warehouse_id: "",
  price: 0,
  brand_id: "",
  revitalized_tire_model_id: "",
  expected_durability: 0,
  depth: 0,
  date_return: "",
  comment: "",
  invoice_date: "",
  invoice_folio: "",
  similar_tires: 1,
  tires: [],
};
