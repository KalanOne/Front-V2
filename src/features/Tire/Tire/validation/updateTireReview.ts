import { z } from "zod";

export { updateTireReviewButtonSchema, updateTireReviewButtonDefaultValues };
export type { UpdateTireReviewButtonSchemaType };

const updateTireReviewButtonSchema = z.object({
  pressure: z.coerce.number().gte(1, "Pressure is required"),
  depth: z.array(
    z.object({
      depth_external: z.coerce.number().gte(1, "Depth External is required"),
      depth_internal: z.coerce.number().gte(1, "Depth Internal is required"),
      depth_middle: z.coerce.number().gte(1, "Depth Middle is required"),
    }),
  ),
  comment: z.string(),
});

type UpdateTireReviewButtonSchemaType = z.infer<
  typeof updateTireReviewButtonSchema
>;

interface UpdateTireReviewButtonDefaultValues {
  pressure: number;
  depth: {
    depth_external: number;
    depth_internal: number;
    depth_middle: number;
  }[];
  comment: string;
}

const updateTireReviewButtonDefaultValues: UpdateTireReviewButtonDefaultValues =
  {
    pressure: 0,
    depth: [],
    comment: "",
  };
