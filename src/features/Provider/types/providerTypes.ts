import { SubsidiaryResponse } from "../../Subsidiary/types/subsidiaryTypes";

export type {
  ProviderResponse,
  ProviderCreateData,
  ProviderUpdateData,
  ProviderStatusData,
};

interface ProviderResponse {
  archived: number;
  created_at: string;
  name: string;
  observation: string;
  old_provider_id: number;
  provider_id: number;
  rfc: string;
  status: number;
  subsidiary: SubsidiaryResponse;
  subsidiary_id: number;
  updated_at: string;
}

interface ProviderCreateData {
  rfc: string;
  subsidiary_id: number;
  name: string;
  observation: string;
}

interface ProviderUpdateData {
  rfc: string;
  subsidiary_id: number;
  name: string;
  observation: string;
}

interface ProviderStatusData {
  status: number;
}
