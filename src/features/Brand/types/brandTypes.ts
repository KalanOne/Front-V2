import { CreatedBy } from "src/types/response";


export type {
  BrandResponse,
  BrandCreateData,
  BrandUpdateData,
  BrandResponseInput,
  BrandApprovedData,
  BrandStatusData,
};

interface BrandResponse {
  approved: number;
  archived: number;
  brand_id: number;
  brand_type: string;
  created_at: string;
  created_by: CreatedBy;
  name: string;
  old_brand_id: number;
  status: number;
  updated_at: string;
  updated_by: CreatedBy;
}

interface BrandCreateData {
  name: string;
  brand_type: string;
}

interface BrandUpdateData {
  name: string;
  brand_type: string;
}

interface BrandResponseInput {
  brand_id: number;
  name: string;
  status: number;
  approved: number;
}

interface BrandApprovedData {
  approved: number;
}

interface BrandStatusData {
  status: number;
}