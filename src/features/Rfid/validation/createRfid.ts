import { z } from "zod";


export { rfidCreateSchema, rfidCreateDefaultValues };
export type { RfidCreateSchemaType };

const rfidCreateSchema = z.object({
  device_code: z.string().min(1, "Code is required"),
  subsidiary_id: z.coerce.number().gte(1, "Subsidiary is required"),
});

type RfidCreateSchemaType = z.infer<typeof rfidCreateSchema>;

interface RfidCreateDefaultValues {
  device_code: string;
  subsidiary_id: number;
}

const rfidCreateDefaultValues: RfidCreateDefaultValues = {
  device_code: "",
  subsidiary_id: 0,
};