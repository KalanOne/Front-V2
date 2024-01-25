import { z } from "zod";

export { rfidFilterSchema, rfidFilterDefaultValues };
export type { RfidFilterSchemaType };

const rfidFilterSchema = z.object({
  status: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  subsidiary_id: z.coerce.string().array(),
});

type RfidFilterSchemaType = z.infer<typeof rfidFilterSchema>;

interface RfidFilterDefaultValues {
  status: string;
  dateTo: string;
  dateFrom: string;
  subsidiary_id: string[];
}

const rfidFilterDefaultValues: RfidFilterDefaultValues = {
  status: "",
  dateTo: "",
  dateFrom: "",
  subsidiary_id: [],
};
