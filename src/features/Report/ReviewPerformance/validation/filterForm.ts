import { z } from "zod";

import { optionalNumber } from "src/utils/zod";

export {
  reviewPerformanceReportFilterSchema,
  reviewPerformanceReportFilterDefaultValues,
};
export type {
  ReviewPerformanceReportFilterSchemaType,
  ReviewPerformanceReportFilterInputType,
};

const reviewPerformanceReportFilterSchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
  corporate_id: optionalNumber,
  companies: z.number().array(),
  subsidiaries: z.number().array(),
});

type ReviewPerformanceReportFilterSchemaType = z.infer<
  typeof reviewPerformanceReportFilterSchema
>;

type ReviewPerformanceReportFilterInputType = z.input<
  typeof reviewPerformanceReportFilterSchema
>;

const reviewPerformanceReportFilterDefaultValues: ReviewPerformanceReportFilterInputType =
  {
    dateFrom: "",
    dateTo: "",
    corporate_id: "",
    companies: [],
    subsidiaries: [],
  };
