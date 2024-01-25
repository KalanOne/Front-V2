import {
  Company,
  TireModel,
  TireSize,
} from "src/features/Tire/Tire/types/tireTypes";
import { CreatedBy } from "src/types/response";

export type {
  SubsidiaryHelmetValueResponse,
  SubsidiaryHelmetValueCreateData,
  SubsidiaryHelmetValueUpdateData,
};

interface SubsidiaryHelmetValueResponse {
  archived: number;
  created_at: string;
  created_by: CreatedBy;
  helmet_value_original: number;
  helmet_value_revitalized: number;
  subsidiary: Subsidiary;
  subsidiary_id: number;
  tire_model_variation: TireModelVariation;
  tire_model_variation_helmet_id: number;
  tire_model_variation_id: number;
  updated_at: string;
  updated_by: CreatedBy;
}

interface Subsidiary {
  archived: number;
  company: Company;
  company_id: number;
  country: string;
  created_at: string;
  created_by: number;
  direction_1: string;
  direction_2?: string;
  external_number: string;
  internal_number?: string;
  name: string;
  old_subsidiary_id: number;
  postal_code: string;
  province: string;
  state: string;
  status: number;
  subsidiary_id: number;
  updated_at: string;
  updated_by: number;
}

interface TireModelVariation {
  approved: number;
  archived: number;
  created_at: string;
  created_by: number;
  depth: number;
  helmet_value_original: number;
  helmet_value_revitalized: number;
  maximum_pressure: number;
  number_layers: number;
  old_tire_model_variation_id?: number;
  projection: number;
  recommended_pressure: number;
  status: number;
  tire_application?: any; // TODO: Add type
  tire_application_id: string;
  tire_model: TireModel;
  tire_model_variation_id: number;
  tire_model_variation_use: TireModelVariationUse[]; // TODO: Missing type
  tire_size: TireSize;
  tire_size_id: number;
  tolerance: number;
  tire_model_id: number;
  updated_at: string;
  updated_by: number;
}

interface TireModelVariationUse {
  created_at: string;
  tire_model_variation_id: number;
  tire_model_variation_use_id: number;
  tire_use: TireUse;
  tire_use_id: string;
  updated_at: string;
}

interface TireUse {
  archived: number;
  created_at: string;
  created_by: number;
  status: number;
  tire_use_id: string;
  updated_at: string;
  updated_by: number;
}

interface SubsidiaryHelmetValueCreateData {
  tire_model_id: number;
  tire_model_variation_id: string;
  helmet_value_original: number;
  helmet_value_revitalized: number;
}

interface SubsidiaryHelmetValueUpdateData {
  helmetId?: number;
  tire_model_id: number;
  tire_model_variation_id: string;
  helmet_value_original: number;
  helmet_value_revitalized: number;
}
