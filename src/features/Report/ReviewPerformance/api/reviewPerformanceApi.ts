import { http } from "src/api/api";

import { ReviewPerformanceResponse } from "../types/reviewPerformanceTypes";

export { getReviewPerformance, getReviewPerformanceAccordion };

async function getReviewPerformance(
  params?: any,
): Promise<ReviewPerformanceResponse> {
  return await http<ReviewPerformanceResponse>({
    method: "GET",
    path: "report/review/performances",
    params: params,
  });
}

async function getReviewPerformanceAccordion(
  reviewId: string,
  subsidiaryId: string,
  params?: any,
): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `report/review/performances/detail/${reviewId}/${subsidiaryId}`,
    params: params,
  });
}
