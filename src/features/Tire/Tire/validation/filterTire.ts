import { z } from "zod";

export { tireFilterSchema, tireFilterDefaultValues };
export type { TireFilterSchemaType };

const tireFilterSchema = z.object({
  status: z.coerce.string(),
  brands: z.coerce.string().array(),
  subsidiaries: z.coerce.string(),
  warehouses: z.coerce.string(),
  providers: z.coerce.string(),
  tire_size: z.string(),
  condition: z.coerce.string(),
  DOT_initial: z.coerce.string(),
  DOT_final: z.coerce.string(),
  date_from: z.coerce.string(),
  date_to: z.coerce.string(),
  invoice_folio: z.coerce.string(),
  invoice_date: z.coerce.string(),
  models: z.coerce.string(),
  location: z.coerce.string(),
  brandsRevitalized: z.coerce.string(),
});

type TireFilterSchemaType = z.infer<typeof tireFilterSchema>;

interface TireFilterDefaultValues {
  status: string;
  brands: string[];
  subsidiaries: string;
  warehouses: string;
  providers: string;
  tire_size: string;
  condition: string;
  DOT_initial: string;
  DOT_final: string;
  date_from: string;
  date_to: string;
  invoice_folio: string;
  invoice_date: string;
  models: string;
  location: string;
  brandsRevitalized: string;
}

const tireFilterDefaultValues: TireFilterDefaultValues = {
  status: "",
  brands: [],
  subsidiaries: "",
  warehouses: "",
  providers: "",
  tire_size: "",
  condition: "",
  DOT_initial: "",
  DOT_final: "",
  date_from: "",
  date_to: "",
  invoice_folio: "",
  invoice_date: "",
  models: "",
  location: "",
  brandsRevitalized: "",
};
