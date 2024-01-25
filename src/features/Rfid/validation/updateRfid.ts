import { z } from "zod";

export { rfidUpdateSchema, rfidUpdateDefaultValues };
export type { RfidUpdateSchemaType };

const rfidUpdateSchema = z.object({
  device_code: z.string().min(1, "Code is required"),
  subsidiary_id: z.coerce.number().gte(1, "Subsidiary is required"),
});

type RfidUpdateSchemaType = z.infer<typeof rfidUpdateSchema>;

interface RfidUpdateDefaultValues {
  device_code: string;
  subsidiary_id: number;
}

const rfidUpdateDefaultValues: RfidUpdateDefaultValues = {
  device_code: "",
  subsidiary_id: 0,
};
