// eslint-disable-next-line no-restricted-imports
import { BrandResponse } from "src/features/Brand/types/brandTypes";
import { CreatedBy } from "src/types/response";

export type {
  RevitalizedTireModelResponse,
  RevitalizedTireModelCreateData,
  RevitalizedTireModelUpdateData,
  RevitalizedTireModelStatusData,
  RevitalizedTireModelApprovedData,
};

interface RevitalizedTireModelResponse {
  revitalized_tire_model_id: number;
  brand_id: number;
  tire_application_id: string;
  name: string;
  depth: number;
  status: number;
  approved: number;
  created_by: CreatedBy;
  updated_by: CreatedBy;
  old_revitalized_tire_model_id: number;
  created_at: string;
  updated_at: string;
  brand: BrandResponse;
}

interface RevitalizedTireModelCreateData {
  brand_id: number;
  depth: number;
  name: string;
  tire_application_id: string;
}

interface RevitalizedTireModelUpdateData {
  brand_id: number;
  depth: number;
  name: string;
  tire_application_id: string;
}

interface RevitalizedTireModelStatusData {
  status: number;
}

interface RevitalizedTireModelApprovedData {
  approved: number;
}
