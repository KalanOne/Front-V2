export type {
  AxlePolicy,
  Vehicle,
  PressurePolicyUpdate,
  PressurePolicyCreate,
  VehicleTypePolicyCreate,
  DeleteIds,
};

interface PressurePolicyUpdate {
  axle_type: string;
  recommended_pressure: number;
  tolerance: number;
  vehicle_id: string;
}

interface VehicleTypePolicyCreate {
  axle_policy: AxlePolicy[];
  vehicle_type_id: string;
}

interface PressurePolicyCreate {
  axle_policy: AxlePolicy[];
  vehicles: Vehicle[];
}

interface AxlePolicy {
  axle_type: string;
  recommended_pressure: number;
  tolerance: number;
}

interface Vehicle {
  vehicle_id: string;
}

interface DeleteIds {
  id2: string;
  id3: string;
}
