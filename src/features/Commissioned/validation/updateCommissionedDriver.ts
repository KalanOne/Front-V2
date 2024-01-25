import { z } from "zod";

export {
  commissionedDriverUpdateSchema,
  commissionedDriverUpdateDefaultValues,
};
export type { CommissionedDriverUpdateSchemaType };

const commissionedDriverUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  driver_code: z.string().min(1, "Driver Code is required"),
  association_id: z.coerce.number().gte(1, "Subsidiary is required"),
});

type CommissionedDriverUpdateSchemaType = z.infer<
  typeof commissionedDriverUpdateSchema
>;

interface CommissionedDriverUpdateDefaultValues {
  name: string;
  driver_code: string;
  association_id: number;
}

const commissionedDriverUpdateDefaultValues: CommissionedDriverUpdateDefaultValues =
  {
    name: "",
    driver_code: "",
    association_id: 0,
  };
