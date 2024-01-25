export type { DamageResponse, DamageUpdateData, DamageUpdateDataComplete, DamageStatusData };

interface DamageResponse {
  action_tire: string;
  action_vehicle: string;
  appearance: string;
  archived: number;
  area: string;
  attribution: string;
  created_at: string;
  damage_category: string;
  damage_id: number;
  frequency: number;
  image: string;
  name: string;
  old_damage_id: number;
  operation: string;
  probable_causes: string;
  status: number;
  updated_at: string;
  lock_cycles: boolean;
}

interface DamageUpdateData {
  name: string;
  appearance: string;
  probable_causes: string;
  operation: string;
  action_vehicle: string;
  action_tire: string;
  damage_category: string;
  area: string;
  lock_cycles: boolean;
}

interface DamageUpdateDataComplete extends DamageUpdateData {
  image: Blob | null;
}

interface DamageStatusData {
  status: number;
}
