export type {
  WearResponse,
  WearUpdateData,
  WearUpdateDataComplete,
  WearStatusData,
};

interface WearResponse {
  action_tire: string;
  action_vehicle: string;
  appearance: string;
  archived: number;
  attribution: string;
  axle: string;
  created_at: string;
  frequency: number;
  image: string;
  name: string;
  old_wear_id: number;
  operation: string;
  probable_causes: string;
  status: number;
  updated_at: string;
  wear_category: string;
  wear_id: number;
}

interface WearUpdateData {
  name: string;
  appearance: string;
  wear_category: string;
  axle: string;
  probable_causes: string;
  action_tire: string;
  action_vehicle: string;
  operation: string;
}

interface WearUpdateDataComplete extends WearUpdateData {
  image: Blob | null;
}

interface WearStatusData {
  status: number;
}
