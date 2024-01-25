import { z } from "zod";

export { sendToWareHouseSchema, sendToWareHouseDefaultValues };
export type { SendToWareHouseSchemaType };

const sendToWareHouseSchema = z.object({
  warehouse_id: z.coerce.string().min(1, "WareHouse is required"),
  price: z.coerce.number().gte(1, "Price is required"),
  brand_id: z.coerce.string().min(1, "Revitalized Brand is required"),
  revitalized_tire_model_id: z.coerce
    .string()
    .min(1, "Revitalized Model is required"),
  expected_durability: z.coerce.number(),
  depth: z.coerce.number().min(1, "Depth is required"),
  date_return: z.string().min(1, "Date Return is required"),
  comment: z.string(),
  invoice_date: z.string(),
  invoice_folio: z.string(),
});

type SendToWareHouseSchemaType = z.infer<typeof sendToWareHouseSchema>;

interface SendToWareHouseDefaultValues {
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
}

const sendToWareHouseDefaultValues: SendToWareHouseDefaultValues = {
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
};
