import { z } from "zod";

export { wearButtonSchema, wearButtonDefaultValues };
export type { WearButtonSchemaType };

const wearButtonSchema = z.object({
  wears: z.array(
    z.object({
      wear_id: z.coerce.string().min(1, "Wear is required"),
      comment: z.coerce.string(),
      image: z.any(),
    }),
  ),
});

type WearButtonSchemaType = z.infer<typeof wearButtonSchema>;

interface WearButtonDefaultValues {
  wears: {
    wear_id: string;
    comment: string;
    image: File | null;
  }[];
}

const wearButtonDefaultValues: WearButtonDefaultValues = {
  wears: [
    {
      wear_id: "",
      comment: "",
      image: null,
    },
  ],
};
