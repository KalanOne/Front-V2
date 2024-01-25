import { http } from "src/api/api";


export {
  getUserReviewSummary,
  getUserReview,
  getUserVehicle,
  getReviewVehicle,
};

async function getUserReview(params?: any): Promise<ReviewResponse> {
  return await http<ReviewResponse>({
    method: "GET",
    path: "report/user/review",
    params: params,
  });
}

async function getUserReviewSummary(params?: any): Promise<any> {
  return await http<any>({
    method: "GET",
    path: "report/user/review/summary",
    params: params,
  });
}

async function getUserVehicle(params?: any): Promise<any> {
  return await http<any>({
    method: "GET",
    path: "report/user/review/details",
    params: params,
  });
}

async function getReviewVehicle(id: any): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `report/user/review/details/${id.id}/tires`,
  });
}