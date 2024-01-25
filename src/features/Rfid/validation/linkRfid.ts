import { z } from "zod";

export { rfidLinkSchema, rfidLinkDefaultValues };
export type { RfidLinkSchemaType };

const rfidLinkSchema = z.object({
  tire_id: z.coerce.string().min(1, "Tire is required"),
});

type RfidLinkSchemaType = z.infer<typeof rfidLinkSchema>;

interface RfidLinkDefaultValues {
  tire_id: string;
}

const rfidLinkDefaultValues: RfidLinkDefaultValues = {
  tire_id: "",
};
