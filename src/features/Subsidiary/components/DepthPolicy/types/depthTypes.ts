export type {
  DepthPolicyUpdate,
  VehicleTypePolicyDepthCreate,
  DepthPolicyCreate,
  AxlePolicyDepth,
  Vehicle,
  DeleteIds,
};

interface DepthPolicyUpdate {
  axle_type: string;
  critical_withdrawal: number;
  good_depth: number;
  scheduled_withdrawal: number;
  vehicle_id: string;
}

interface VehicleTypePolicyDepthCreate {
  axle_policy: AxlePolicyDepth[];
  vehicle_type_id: string;
}

interface DepthPolicyCreate {
  axle_policy: AxlePolicyDepth[];
  vehicles: Vehicle[];
}

interface AxlePolicyDepth {
  axle_type: string;
  critical_withdrawal: number;
  good_depth: number;
  scheduled_withdrawal: number;
}

interface Vehicle {
  vehicle_id: string;
}

interface DeleteIds {
  id2: string;
  id3: string;
}
