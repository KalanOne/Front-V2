import { z } from "zod";


export { driverUpdateSchema, driverUpdateDefaultValues };
export type { DriverUpdateSchemaType };

const driverUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subsidiary_id: z.coerce.number().gte(1, "Subsidiary is required"),
});

type DriverUpdateSchemaType = z.infer<typeof driverUpdateSchema>;

interface DriverUpdateDefaultValues {
  name: string;
  subsidiary_id: number;
}

const driverUpdateDefaultValues: DriverUpdateDefaultValues = {
  name: "",
  subsidiary_id: 0,
};