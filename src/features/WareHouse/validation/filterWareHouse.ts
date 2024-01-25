import { z } from "zod";

export { wareHouseFilterSchema, wareHouseFilterDefaultValues };
export type { WareHouseFilterSchemaType };

const wareHouseFilterSchema = z.object({
  status: z.string(),
  subsidiary_id: z.coerce.string().array(),
});

type WareHouseFilterSchemaType = z.infer<typeof wareHouseFilterSchema>;

interface WareHouseFilterDefaultValues {
  status: string;
  subsidiary_id: string[];
}

const wareHouseFilterDefaultValues: WareHouseFilterDefaultValues = {
  status: "",
  subsidiary_id: [],
};
