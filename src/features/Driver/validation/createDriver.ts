import { z } from "zod";

export { driverCreateSchema, driverCreateDefaultValues };
export type { DriverCreateSchemaType };

const driverCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subsidiary_id: z.coerce.number().gte(1, "Subsidiary is required"),
});

type DriverCreateSchemaType = z.infer<typeof driverCreateSchema>;

interface DriverCreateDefaultValues {
  name: string;
  subsidiary_id: number;
}

const driverCreateDefaultValues: DriverCreateDefaultValues = {
  name: "",
  subsidiary_id: 0,
};
