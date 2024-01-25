import { z } from "zod";


export {
  commissionedDriverCreateSchema,
  commissionedDriverCreateDefaultValues,
};
export type { CommissionedDriverCreateSchemaType };

const commissionedDriverCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  driver_code: z.string().min(1, "Driver Code is required"),
  association_id: z.coerce.number().gte(1, "Subsidiary is required"),
});

type CommissionedDriverCreateSchemaType = z.infer<
  typeof commissionedDriverCreateSchema
>;

interface CommissionedDriverCreateDefaultValues {
  name: string;
  driver_code: string;
  association_id: number;
}

const commissionedDriverCreateDefaultValues: CommissionedDriverCreateDefaultValues =
  {
    name: "",
    driver_code: "",
    association_id: 0,
  };