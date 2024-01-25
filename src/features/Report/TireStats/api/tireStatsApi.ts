import { http } from "src/api/api";

export { getTireStats };

async function getTireStats(params?: any): Promise<any> {
  return await http<any>({
    method: "GET",
    path: "report/statistics",
    params: params,
  });
}
