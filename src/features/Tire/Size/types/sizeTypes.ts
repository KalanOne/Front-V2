export type {
  SizeResponse,
  SizeCreateData,
  SizeUpdateData,
  SizeResponseInput,
  SizeApprovedData,
  SizeStatusData,
};

interface SizeResponse {
  approved: number;
  archived: number;
  created_at: string;
  old_tire_size_id: number;
  size: string;
  status: number;
  tire_size_id: number;
  updated_at: string;
}

interface SizeCreateData {
  size: string;
}

interface SizeUpdateData {
  size: string;
}

interface SizeResponseInput {
  tire_size_id: number;
  size: string;
  status: number;
  approved: number;
}

interface SizeApprovedData {
  approved: number;
}

interface SizeStatusData {
  status: number;
}
