import { z } from "zod";

export { userReviewFilterSchema, userReviewFilterDefaultValues };
export type { UserReviewFilterSchemaType };

const userReviewFilterSchema = z.object({
  dateTo: z.string(),
  dateFrom: z.string(),
  corporate_id: z.coerce.string(),
  companies: z.coerce.string().array(),
  subsidiaries: z.coerce.string().array(),
  users: z.coerce.string().array(),
  divisions: z.coerce.string().array(),
  activity: z.string(),
  review_type: z.string(),
});

type UserReviewFilterSchemaType = z.infer<typeof userReviewFilterSchema>;

interface UserReviewFilterDefaultValues {
  dateTo: string;
  dateFrom: string;
  corporate_id: string;
  companies: string[];
  subsidiaries: string[];
  users: string[];
  divisions: string[];
  activity: string;
  review_type: string;
}

const userReviewFilterDefaultValues: UserReviewFilterDefaultValues = {
  dateTo: "",
  dateFrom: "",
  corporate_id: "",
  companies: [],
  subsidiaries: [],
  users: [],
  divisions: [],
  activity: "",
  review_type: "",
};
