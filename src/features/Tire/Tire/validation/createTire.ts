import { z } from "zod";

export { tireCreateSchema, tireCreateDefaultValues };
export type { TireCreateSchemaType };

const tireCreateSchema = z.object({
  code: z.string().min(1, "Code is required"),
  rfid_id: z.coerce.string(),
  subsidiary_id: z.coerce.string().min(1, "Subsidiary is required"),
  warehouse_id: z.coerce.string().min(1, "Warehouse is required"),
  provider_id: z.coerce.string().min(1, "Provider is required"),
  brand_id: z.coerce.string(),
  model_id: z.coerce.string(),
  tire_model_variation_id: z.coerce
    .string()
    .min(1, "Model Variation is required"),
  price: z.coerce.number().gte(1, "Price is required"),
  expected_durability: z.coerce.number(),
  dot: z.string(),
  invoice_date: z.string(),
  invoice_folio: z.string(),
  similar_tires: z.coerce.number().gte(1, "Similar is required"),
  tires: z.array(
    z.object({
      code: z.string().min(1, "Code is required"),
      rfid_id: z.coerce.string(),
      dot: z.string(),
    }),
  ),
});

type TireCreateSchemaType = z.infer<typeof tireCreateSchema>;

interface TireCreateDefaultValues {
  code: string;
  rfid_id: string;
  subsidiary_id: string;
  warehouse_id: string;
  provider_id: string;
  brand_id: string;
  model_id: string;
  tire_model_variation_id: string;
  price: number;
  expected_durability: number;
  dot: string;
  invoice_date: string;
  invoice_folio: string;
  similar_tires: number;
  tires: {
    code: string;
    rfid_id: string;
    dot: string;
  }[];
}

const tireCreateDefaultValues: TireCreateDefaultValues = {
  code: "",
  rfid_id: "",
  subsidiary_id: "",
  warehouse_id: "",
  provider_id: "",
  brand_id: "",
  model_id: "",
  tire_model_variation_id: "",
  price: 0,
  expected_durability: 0,
  dot: "",
  invoice_date: "",
  invoice_folio: "",
  similar_tires: 1,
  tires: [],
};
