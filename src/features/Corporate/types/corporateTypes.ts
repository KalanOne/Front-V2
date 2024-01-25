export type {
  CorporateResponse,
  CorporateCreateData,
  CorporateUpdateData,
  CorporateResponseInput,
  CorporateStatusData,
};

interface CorporateResponse {
  archived: number;
  corporate_id: number;
  created_at: string;
  logo: string;
  name: string;
  rfc: string;
  social_reason: string;
  status: number;
  updated_at: string;
  tire_fee: number;
  fee_currency_type: string;
}

interface CorporateCreateData {
  logo?: Blob | null;
  name: string;
  social_reason: string;
  rfc: string;
  tire_fee: number;
  fee_currency_type: string;
}

interface CorporateUpdateData {
  logo?: Blob | null;
  name: string;
  social_reason: string;
  rfc: string;
  tire_fee: number;
  fee_currency_type: string;
}

interface CorporateResponseInput {
  corporate_id: number;
  name: string;
  status: number;
}

interface CorporateStatusData {
  status: number;
}
