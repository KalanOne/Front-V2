import { z } from "zod";

export { driverFilterSchema, driverFilterDefaultValues };
export type { DriverFilterSchemaType };

const driverFilterSchema = z.object({
  status: z.string(),
  subsidiary_id: z.coerce.string().array(),
});

type DriverFilterSchemaType = z.infer<typeof driverFilterSchema>;

interface DriverFilterDefaultValues {
  status: string;
  subsidiary_id: string[];
}

const driverFilterDefaultValues: DriverFilterDefaultValues = {
  status: "",
  subsidiary_id: [],
};
