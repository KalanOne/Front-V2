import { z } from "zod";

export { sendToWareHouseRepairSchema, sendToWareHouseRepairDefaultValues };
export type { SendToWareHouseRepairSchemaType };

const sendToWareHouseRepairSchema = z
  .object({
    driver_id: z.coerce.string().optional(),
    comment: z.string(),
    surcharge: z.coerce.number(),
    surcharge_item: z.coerce.string().optional(),
    date_return: z.coerce.string().min(1, "Date Return is required"),
    warehouse_id: z.coerce.string().min(1, "WareHouse is required"),
    price: z.coerce.number().gte(1, "Price is required"),
    invoice_date: z.string(),
    invoice_folio: z.string(),
    repair_detail: z.boolean(),
    repairs: z.array(
      z.object({
        repair_name: z.coerce.string().min(1, "Repair is required"),
        price: z.coerce.number().gte(1, "Price is required"),
      }),
    ),
  })
  .superRefine((val, ctx) => {
    if (val.surcharge > 0 && val.driver_id?.length === 0) {
      ctx.addIssue({
        path: ["driver_id"],
        code: z.ZodIssueCode.custom,
        message: "Driver is required",
      });
    }
    if (val.surcharge > 0 && val.surcharge_item?.length === 0) {
      ctx.addIssue({
        path: ["surcharge_item"],
        code: z.ZodIssueCode.custom,
        message: "Surcharge Item is required",
      });
    }
  });

type SendToWareHouseRepairSchemaType = z.infer<
  typeof sendToWareHouseRepairSchema
>;

interface SendToWareHouseRepairDefaultValues {
  driver_id: string;
  comment: string;
  surcharge: number;
  surcharge_item: string;
  date_return: string;
  warehouse_id: string;
  price: number;
  invoice_date: string;
  invoice_folio: string;
  repair_detail: boolean;
  repairs: {
    repair_name: string;
    price: number;
  }[];
}

const sendToWareHouseRepairDefaultValues: SendToWareHouseRepairDefaultValues = {
  driver_id: "",
  comment: "",
  surcharge: 0,
  surcharge_item: "",
  date_return: "",
  warehouse_id: "",
  price: 0,
  invoice_date: "",
  invoice_folio: "",
  repair_detail: false,
  repairs: [],
};
