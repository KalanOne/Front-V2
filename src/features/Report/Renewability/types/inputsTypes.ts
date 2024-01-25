export type {
  CorporateInputResponse,
  CompanyInputResponse,
  SubsidiaryInputResponse,
  ModelInputResponse,
  SizeResponseInput,
  BrandResponseInput,
};

interface CorporateInputResponse {
  corporate_id: number;
  name: string;
  status: number;
}

interface CompanyInputResponse {
  company_id: number;
  name: string;
  status: number;
}

interface SubsidiaryInputResponse {
  subsidiary_id: number;
  name: string;
  status: number;
}

interface TireModelInputResponse {
  tire_model_id: number;
  name: string;
  status: number;
  approved: number;
}

interface ModelInputResponse {
  tire_model_id: number;
  tire_model: TireModelInputResponse;
}

interface SizeResponseInput {
  tire_size_id: number;
  size: string;
  status: number;
}

interface BrandResponseInput {
  brand_id: number;
  name: string;
  status: number;
}
