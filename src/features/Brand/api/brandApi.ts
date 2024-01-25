import { PanoramaSharp } from "@mui/icons-material";



import { http } from "src/api/api.ts";
import { CreateApiFunctionParams, DeleteApiFunctionParams, GetApiFunctionParams, IdApiExtras, PostApiFunctionParams, UpdateApiFunctionParams } from "src/types/api.ts";
import { MessageResponse, PaginatedResponse } from "src/types/response.ts";



import { BrandApprovedData, BrandCreateData, BrandResponse, BrandResponseInput, BrandStatusData, BrandUpdateData } from "../types/brandTypes.ts";


export {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  brandStatus,
  brandApproved,
  getBrandsInput,
  getBrandsInputRetread,
};

async function getBrand(id: number): Promise<BrandResponse> {
  return await http<BrandResponse>({
    method: "GET",
    path: `brand/${id}`,
  });
}

async function getBrands(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<BrandResponse>> {
  return await http<PaginatedResponse<BrandResponse>>({
    method: "GET",
    path: "brand",
    params: params.params,
  });
}

async function createBrand(
  params: CreateApiFunctionParams<BrandCreateData>,
): Promise<BrandResponse> {
  return await http<BrandResponse>({
    method: "POST",
    path: `brand`,
    data: params.data,
  });
}

async function updateBrand(
  params: UpdateApiFunctionParams<BrandUpdateData>,
): Promise<BrandResponse> {
  return await http<BrandResponse>({
    method: "PUT",
    path: `brand/${params.id}`,
    data: params.data,
  });
}

async function deleteBrand(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `brand/${params.id}`,
  });
}

async function brandStatus(
  params: PostApiFunctionParams<BrandStatusData>,
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `brand/${params.id}/status`,
    data: params.data,
  });
}

async function brandApproved(params: PostApiFunctionParams<BrandApprovedData>) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `brand/${params.id}/approved`,
    data: params.data,
  });
}

async function getBrandsInput(
  params: GetApiFunctionParams,
): Promise<BrandResponseInput[]> {
  return await http<BrandResponseInput[]>({
    method: "GET",
    path: "brand",
    params: params.params,
  });
}

async function getBrandsInputRetread(): Promise<BrandResponseInput[]> {
  return await http<BrandResponseInput[]>({
    method: "GET",
    path: "brand",
    params: {
      order: "DESC",
      scope: "brand_id,name,status,approved",
      brand_type: "RETREAD",
    },
  });
}