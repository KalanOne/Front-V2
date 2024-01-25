import { z } from "zod";

export { tireUpdateSchema, tireUpdateDefaultValues };
export type { TireUpdateSchemaType };

const tireUpdateSchema = z.object({
  code: z.string().min(1, "Code is required"),
  rfid_id: z.coerce.string(),
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
  is_refection: z.boolean(),
  cap_and_casing: z.boolean(),
});

type TireUpdateSchemaType = z.infer<typeof tireUpdateSchema>;

interface TireUpdateDefaultValues {
  code: string;
  rfid_id: string;
  provider_id: string;
  brand_id: string;
  model_id: string;
  tire_model_variation_id: string;
  price: number;
  expected_durability: number;
  dot: string;
  invoice_date: string;
  invoice_folio: string;
  is_refection: boolean;
  cap_and_casing: boolean;
}

const tireUpdateDefaultValues: TireUpdateDefaultValues = {
  code: "",
  rfid_id: "",
  provider_id: "",
  brand_id: "",
  model_id: "",
  tire_model_variation_id: "",
  price: 0,
  expected_durability: 0,
  dot: "",
  invoice_date: "",
  invoice_folio: "",
  is_refection: false,
  cap_and_casing: false,
};
