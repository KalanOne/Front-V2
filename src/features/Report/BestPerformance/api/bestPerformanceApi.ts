import { http } from "src/api/api.ts";

export { getBestPerformance };

async function getBestPerformance(params?: any): Promise<any> {
  return await http<any>({
    method: "GET",
    path: "report/performance/cost",
    params: params,
  });
}
