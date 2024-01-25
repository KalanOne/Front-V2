import { SubsidiaryResponse } from "src/features/Subsidiary/types/subsidiaryTypes";

export type {
  CommissionedDriverResponse,
  CommissionedDriverCreateData,
  CommissionedDriverUpdateData,
  CommissionedDriverStatusData,
  AssociationResponse,
};

interface CommissionedDriverResponse {
  archived: number;
  association: AssociationResponse;
  association_id: number;
  commissioned_driver_id: number;
  created_at: string;
  driver_code: string;
  name: string;
  status: number;
  updated_at: string;
}

interface CommissionedDriverCreateData {
  name: string;
  driver_code: string;
  association_id: number;
}

interface CommissionedDriverUpdateData {
  name: string;
  driver_code: string;
  association_id: number;
}

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

interface CommissionedDriverStatusData {
  status: number;
}
