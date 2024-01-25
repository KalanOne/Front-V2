export type {
  CompanyResponse,
  CompanyCreateData,
  CompanyUpdateData,
  CompanyStatusData,
};

interface CompanyResponse {
  archived: number;
  company_id: number;
  corporate_id: number;
  created_at: string;
  logo: string;
  name: string;
  old_company_id: number;
  rfc: string;
  social_reason: string;
  status: number;
  updated_at: string;
  tire_fee: number;
  fee_currency_type: string;
}

interface CompanyCreateData {
  logo?: Blob | null;
  name: string;
  corporate_id: number;
  social_reason: string;
  rfc: string;
  tire_fee: number;
  fee_currency_type: string;
}

interface CompanyUpdateData {
  logo?: Blob | null;
  name: string;
  corporate_id: number;
  social_reason: string;
  rfc: string;
  tire_fee: number;
  fee_currency_type: string;
}

interface CompanyStatusData {
  status: number;
}
