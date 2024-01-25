import { http } from "src/api/api";

export { getSemaphore };

async function getSemaphore(params?: any): Promise<any> {
  return await http<any>({
    method: "GET",
    path: "report/vehicle/semaphore",
    params: params,
  });
}
