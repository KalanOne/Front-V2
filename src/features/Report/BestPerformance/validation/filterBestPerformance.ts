import { z } from "zod";

export { bestPerformanceFilterSchema, bestPerformanceFilterDefaultValues };
export type { BestPerformanceFilterSchemaType };

const bestPerformanceFilterSchema = z.object({
  movement: z.coerce.string(),
  subsidiaries: z.coerce.string().array(),
  companies: z.coerce.string(),
  corporate_id: z.coerce.string(),
  date_from: z.coerce.string(),
  date_to: z.coerce.string(),
  tire_application: z.coerce.string().array(),
  tire_condition: z.coerce.string().array(),
  price: z.coerce.string(),
  helmet_value: z.coerce.string(),
  min_travel: z.coerce.string(),
  max_travel: z.coerce.string(),
});

type BestPerformanceFilterSchemaType = z.infer<
  typeof bestPerformanceFilterSchema
>;

interface BestPerformanceFilterDefaultValues {
  movement: string;
  subsidiaries: string[];
  companies: string;
  corporate_id: string;
  date_from: string;
  date_to: string;
  tire_application: string[];
  tire_condition: string[];
  price: string;
  helmet_value: string;
  min_travel: string;
  max_travel: string;
}

const bestPerformanceFilterDefaultValues: BestPerformanceFilterDefaultValues = {
  movement: "MOUNT",
  subsidiaries: [],
  companies: "",
  corporate_id: "",
  date_from: "",
  date_to: "",
  tire_application: [],
  tire_condition: [],
  price: "",
  helmet_value: "",
  min_travel: "",
  max_travel: "",
};
