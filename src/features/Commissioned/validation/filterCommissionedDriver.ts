import { z } from "zod";

export {
  commissionedDriverFilterSchema,
  commissionedDriverFilterDefaultValues,
};
export type { CommissionedDriverFilterSchemaType };

const commissionedDriverFilterSchema = z.object({
  status: z.string(),
  association_id: z.coerce.string(),
});

type CommissionedDriverFilterSchemaType = z.infer<
  typeof commissionedDriverFilterSchema
>;

interface CommissionedDriverFilterDefaultValues {
  status: string;
  association_id: string;
}

const commissionedDriverFilterDefaultValues: CommissionedDriverFilterDefaultValues =
  {
    status: "",
    association_id: "",
  };
