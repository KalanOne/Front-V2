import { z } from "zod";

export { pathDamageButtonSchema, pathDamageButtonDefaultValues };
export type { PathDamageButtonSchemaType };

const pathDamageButtonSchema = z
  .object({
    damages: z.array(
      z.object({
        damage_id: z.coerce.string().min(1, "Damage is required"),
        comment: z.coerce.string(),
        image: z.any(),
      }),
    ),
    provider_id: z.coerce.number().min(1, "Provider is required"),
    price: z.coerce.number().min(1, "Price is required"),
    invoice_date: z.string(),
    invoice_folio: z.string(),
    surcharge: z.coerce.number(),
    driver_id: z.coerce.number(),
    surcharge_item: z.string(),
  })
  .refine((data) => {
    if (data.surcharge) {
      return data.driver_id && data.surcharge_item;
    }
    return true;
  });

type PathDamageButtonSchemaType = z.infer<typeof pathDamageButtonSchema>;

interface PathDamageButtonDefaultValues {
  damages: {
    damage_id: string;
    comment: string;
    image: File | null;
  }[];
  provider_id: string;
  price: string;
  invoice_date: "";
  invoice_folio: "";
  surcharge: "";
  driver_id: "";
  surcharge_item: "";
}

const pathDamageButtonDefaultValues: PathDamageButtonDefaultValues = {
  damages: [{ damage_id: "", comment: "", image: null }],
  provider_id: "",
  price: "",
  invoice_date: "",
  invoice_folio: "",
  surcharge: "",
  driver_id: "",
  surcharge_item: "",
};
