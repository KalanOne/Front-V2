// eslint-disable-next-line no-restricted-imports
import { BrandResponse } from "src/features/Brand/types/brandTypes";
import { CreatedBy } from "src/types/response";

import { SizeResponse } from "../../Size/types/sizeTypes";

export type {
  OriginaModelResponse,
  OriginalModelCreateData,
  OriginalModelUpdateData,
  OriginalModelUpdateDataComplete,
  OriginalModelTireModel,
  OriginalModelVariantUse,
  OriginalModelStatusData,
  OriginalModelApprovedData,
};

interface OriginalModelTireModel {
  approved: number;
  archived: number;
  brand: BrandResponse;
  brand_id: number;
  created_at: string;
  created_by: number;
  data_sheet: string;
  name: string;
  old_tire_model_id: number;
  status: number;
  tire_model_id: number;
  updated_at: string;
}

interface OriginalModelVariantUse {
  created_at: string;
  tire_model_variation_id: number;
  tire_model_variation_use_id: number;
  tire_use_id: string;
  updated_at: string;
}

interface OriginaModelResponse {
  approved: number;
  archived: number;
  created_at: string;
  created_by: CreatedBy;
  depth: number;
  helmet_value_original: number;
  helmet_value_revitalized: number;
  maximum_pressure: number;
  number_layers: number;
  old_tire_model_variation_id: number;
  projection: number;
  recommended_pressure: number;
  status: number;
  tire_application_id: string;
  tire_model: OriginalModelTireModel;
  tire_model_id: number;
  tire_model_variation_id: number;
  tire_size: SizeResponse;
  tire_size_id: number;
  tolerance: number;
  updated_at: string;
  tire_model_variation_use: OriginalModelVariantUse[];
}

interface OriginalModelCreateData {
  data_sheet: Blob | null;
  name: string;
  tire_size_id: number;
  brand_id: number;
  tire_application_id: string;
  number_layers: number;
  depth: number;
  maximum_pressure: number;
  recommended_pressure: number;
  tolerance: number;
  helmet_value_original: number;
  helmet_value_revitalized: number;
  tire_model_variation_use: string;
}

interface OriginalModelUpdateData {
  data_sheet?: Blob;
  tire_model_id: number;
  name: string;
  tire_size_id: number;
  brand_id: number;
  tire_application_id: string;
  number_layers: number;
  depth: number;
  maximum_pressure: number;
  recommended_pressure: number;
  tolerance: number;
  helmet_value_original: number;
  helmet_value_revitalized: number;
  tire_model_variation_use: string;
  logo: undefined;
  image: undefined;
  tire_model_variation_id: number;
}

interface OriginalModelUpdateDataComplete extends OriginalModelUpdateData {
  data_sheet: Blob;
}

interface OriginalModelStatusData {
  status: number;
}

interface OriginalModelApprovedData {
  approved: number;
}
