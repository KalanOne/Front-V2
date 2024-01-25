import { http } from "src/api/api";

import {
  StartReviewData,
  UpdateReviewData,
  VehicleResponse,
} from "../types/vehicleInspectionTypes";

export {
  getVehicles,
  startVehicleReview,
  deleteVehicleReview,
  updateVehicleReview,
  finalizeVehicleReview,
  dialogTireInfo,
  physicalDifferenceUpdate,
  createTireReview,
  damageTireReview,
  wearTireReview,
  pathDamageTireReview,
};

async function getVehicles(params?: any): Promise<VehicleResponse[]> {
  return await http<VehicleResponse[]>({
    method: "GET",
    path: "vehicle",
    params: params,
  });
}

async function startVehicleReview(
  id: string | number,
  data: StartReviewData,
): Promise<any> {
  return await http<any>({
    method: "POST",
    path: `vehicle/${id}/review`,
    data: data,
  });
}

async function deleteVehicleReview(id: string | number): Promise<any> {
  return await http<any>({
    method: "DELETE",
    path: `vehicle/${id}/review`,
  });
}

async function updateVehicleReview(
  id: string | number,
  data: UpdateReviewData,
): Promise<any> {
  return await http<any>({
    method: "PUT",
    path: `vehicle/${id}/review`,
    data: data,
  });
}

async function finalizeVehicleReview(id: string | number): Promise<any> {
  return await http<any>({
    method: "PUT",
    path: `vehicle/${id}/review/finalize`,
  });
}

async function dialogTireInfo(
  id: string | number,
  tireId: string | number,
): Promise<any> {
  return await http<any>({
    method: "GET",
    path: `vehicle/${id}/tire/${tireId}`,
  });
}

async function physicalDifferenceUpdate(
  id: string | number,
  data: any,
): Promise<any> {
  return await http<any>({
    method: "POST",
    path: `vehicle/${id}/physical/difference`,
    data: data,
  });
}

async function createTireReview(id: string | number, data: any): Promise<any> {
  return await http<any>({
    method: "POST",
    path: `tire/${id}/review`,
    data: data,
  });
}

async function damageTireReview(id: string | number, data: any): Promise<any> {
  return await http<any>({
    method: "POST",
    path: `tire/${id}/damage`,
    data: data,
    dataWithFiles: true,
  });
}

async function wearTireReview(id: string | number, data: any): Promise<any> {
  return await http<any>({
    method: "POST",
    path: `tire/${id}/wear`,
    data: data,
    dataWithFiles: true,
  });
}

async function pathDamageTireReview(
  id: string | number,
  data: any,
): Promise<any> {
  return await http<any>({
    method: "POST",
    path: `tire/${id}/repair/damage`,
    data: data,
    dataWithFiles: true,
  });
}
