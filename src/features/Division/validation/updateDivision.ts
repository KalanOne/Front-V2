import { z } from "zod";


export { divisionUpdateSchema, divisionUpdateDefaultValues };
export type { DivisionUpdateSchemaType };

const divisionUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subsidiary_id: z.coerce.number().gte(1, "Subsidiary is required"),
});

type DivisionUpdateSchemaType = z.infer<typeof divisionUpdateSchema>;

interface DivisionUpdateDefaultValues {
  name: string;
  subsidiary_id: number;
}

const divisionUpdateDefaultValues: DivisionUpdateDefaultValues = {
  name: "",
  subsidiary_id: 0,
};