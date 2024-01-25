import { z } from "zod";

export { divisionFilterSchema, divisionFilterDefaultValues };
export type { DivisionFilterSchemaType };

const divisionFilterSchema = z.object({
  status: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  subsidiary_id: z.coerce.string().array(),
});

type DivisionFilterSchemaType = z.infer<typeof divisionFilterSchema>;

interface DivisionFilterDefaultValues {
  status: string;
  dateTo: string;
  dateFrom: string;
  subsidiary_id: string[];
}

const divisionFilterDefaultValues: DivisionFilterDefaultValues = {
  status: "",
  dateTo: "",
  dateFrom: "",
  subsidiary_id: [],
};
