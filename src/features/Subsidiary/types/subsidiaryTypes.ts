export type {
  SubsidiaryResponse,
  SubsidiaryCreateData,
  SubsidiaryUpdateData,
  SubsidiaryStatusData,
};

interface SubsidiaryResponse {
  archived: number;
  company_id: number;
  country: string;
  created_at: string;
  direction_1: string;
  direction_2: string;
  external_number: string;
  internal_number: string;
  name: string;
  old_subsidiary_id: number;
  postal_code: string;
  province: string;
  state: string;
  status: number;
  subsidiary_id: number;
  updated_at: string;
}

interface SubsidiaryCreateData {
  name: string;
  company_id: number;
  direction_1: string;
  external_number: string;
  internal_number: string;
  direction_2: string;
  postal_code: string;
  country: string;
  state: string;
  province: string;
}

interface SubsidiaryUpdateData {
  name: string;
  company_id: number;
  direction_1: string;
  external_number: string;
  internal_number: string;
  direction_2: string;
  postal_code: string;
  country: string;
  state: string;
  province: string;
}

interface SubsidiaryStatusData {
  status: number;
}
