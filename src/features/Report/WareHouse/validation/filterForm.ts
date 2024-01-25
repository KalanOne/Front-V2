import { z } from "zod";



import { optionalNumber } from "src/utils/zod";


export { wareHouseReportFilterSchema, wareHouseReportFilterDefaultValues };
export type { WareHouseReportFilterSchemaType, WareHouseReportFilterInputType };

const wareHouseReportFilterSchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
  corporate_id: optionalNumber,
  company_id: optionalNumber,
  subsidiary_id: optionalNumber,
  warehouse_id: optionalNumber,
  provider_id: optionalNumber,
  brand_id: optionalNumber,
  model_id: optionalNumber,
  tire_model_variation_id: z.number().array(),
  brandRetread_id: optionalNumber,
  modelRevitalized_id: optionalNumber,
  condition: z.string(),
  tire_application: z.string(),
});

type WareHouseReportFilterSchemaType = z.infer<
  typeof wareHouseReportFilterSchema
>;

type WareHouseReportFilterInputType = z.input<
  typeof wareHouseReportFilterSchema
>;

const wareHouseReportFilterDefaultValues: WareHouseReportFilterInputType = {
  dateFrom: "",
  dateTo: "",
  corporate_id: "",
  company_id: "",
  subsidiary_id: "",
  warehouse_id: "",
  provider_id: "",
  brand_id: "",
  model_id: "",
  tire_model_variation_id: [],
  brandRetread_id: "",
  modelRevitalized_id: "",
  condition: "",
  tire_application: "",
};