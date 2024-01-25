import { z } from "zod";

export { alertTireFilterSchema, alertTireFilterDefaultValues };
export type { AlertTireFilterSchemaType };

const alertTireFilterSchema = z.object({
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
  models: z.coerce.string(),
  brandsRevitalized: z.coerce.string(),
});

type AlertTireFilterSchemaType = z.infer<typeof alertTireFilterSchema>;

interface AlertTireFilterDefaultValues {
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
  models: string;
  brandsRevitalized: string;
}

const alertTireFilterDefaultValues: AlertTireFilterDefaultValues = {
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
  models: "",
  brandsRevitalized: "",
};
