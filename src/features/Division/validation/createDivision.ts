import { z } from "zod";


export { divisionCreateSchema, divisionCreateDefaultValues };
export type { DivisionCreateSchemaType };

const divisionCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subsidiary_id: z.coerce.number().gte(1, "Subsidiary is required"),
});

type DivisionCreateSchemaType = z.infer<typeof divisionCreateSchema>;

interface DivisionCreateDefaultValues {
  name: string;
  subsidiary_id: number;
}

const divisionCreateDefaultValues: DivisionCreateDefaultValues = {
  name: "",
  subsidiary_id: 0,
};