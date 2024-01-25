export type {
  BrandResponseInput,
  VehicleTypeResponseInput,
  DriverResponseInput,
};
interface BrandResponseInput {
  brand_id: number;
  brand_type: string;
  name: string;
  status: number;
}

interface VehicleTypeResponseInput {
  vehicle_type_id: number;
  name: string;
  status: number;
  vehicle_type_axle_count: number;
}

interface DriverResponseInput {
  driver_id: number;
  name: string;
  status: number;
}
