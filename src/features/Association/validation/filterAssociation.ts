import { z } from "zod";

export { associationFilterSchema, associationFilterDefaultValues };
export type { AssociationFilterSchemaType };

const associationFilterSchema = z.object({
  status: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  subsidiary_id: z.coerce.string().array(),
});

type AssociationFilterSchemaType = z.infer<typeof associationFilterSchema>;

interface AssociationFilterDefaultValues {
  status: string;
  dateTo: string;
  dateFrom: string;
  subsidiary_id: string[];
}

const associationFilterDefaultValues: AssociationFilterDefaultValues = {
  status: "",
  dateTo: "",
  dateFrom: "",
  subsidiary_id: [],
};
