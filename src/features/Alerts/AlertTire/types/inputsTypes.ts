export type {
  ProviderResponseInput,
  WarehouseResponseInput,
  VehicleResponseInput,
  ModelRevitalizedResponseInput,
};

interface ProviderResponseInput {
  name: string;
  provider_id: number;
  status: number;
}

interface WarehouseResponseInput {
  name: string;
  warehouse_id: number;
  status: number;
}

interface VehicleReviewInput {
  created_at: string;
  created_by: number;
  date: string;
  diff_previous_odometer: number;
  end_time: string;
  history: number;
  last_review_month: number;
  observation: unknown; // TODO: Check if this is correct
  odometer: number;
  old_vehicle_review_id: unknown; // TODO: Check if this is correct
  review_type: string;
  start_time: string;
  updated_at: string;
  updated_by: number;
  vehicle_id: number;
  vehicle_review_id: number;
}

interface VehicleResponseInput {
  economic_number: string;
  status: number;
  vehicle_id: number;
  vehicle_review: VehicleReviewInput[];
}

interface ModelRevitalizedResponseInput {
  name: string;
  revitalized_tire_model_id: number;
  status: number;
}
