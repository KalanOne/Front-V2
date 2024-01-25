import { SubsidiaryResponse } from "../../Subsidiary/types/subsidiaryTypes";

export type {
  AssociationResponse,
  AssociationCreateData,
  AssociationUpdateData,
  AssociationStatusData
};

interface AssociationResponse {
  archived: number;
  association_id: number;
  country: string;
  created_at: string;
  direction_1: string;
  direction_2: string;
  external_number: string;
  internal_number: string;
  name: string;
  postal_code: string;
  province: string;
  state: string;
  status: number;
  subsidiary: SubsidiaryResponse;
  subsidiary_id: number;
  updated_at: string;
}

interface AssociationCreateData {
  name: string;
  subsidiary_id: number;
  direction_1: string;
  external_number: string;
  internal_number: string;
  direction_2: string;
  postal_code: string;
  country: string;
  state: string;
  province: string;
}

interface AssociationUpdateData {
  name: string;
  subsidiary_id: number;
  direction_1: string;
  external_number: string;
  internal_number: string;
  direction_2: string;
  postal_code: string;
  country: string;
  state: string;
  province: string;
}

interface AssociationStatusData {
  status: number;
}
