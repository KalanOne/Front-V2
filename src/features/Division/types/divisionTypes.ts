export type {
  DivisionResponse,
  DivisionCreateData,
  DivisionUpdateData,
  DivisionStatusData,
};

interface DivisionResponse {
  archived: number;
  created_at: string;
  division_id: number;
  name: string;
  old_division_id: number;
  status: number;
  subsidiary_id: number;
  updated_at: string;
}

interface DivisionCreateData {
  name: string;
  subsidiary_id: number;
}

interface DivisionUpdateData {
  name: string;
  subsidiary_id: number;
}

interface DivisionStatusData {
  status: number;
}
