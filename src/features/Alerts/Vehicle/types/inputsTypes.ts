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

// interface VehicleResponseInput {
//   vehicle_id: number;
//   economic_number: string;
//   status: number;
//   vehicle_review: VehicleReviewResponseInput[];
// }
//
// interface VehicleReviewResponseInput {
//   vehicle_review_id: number;
//   vehicle_id: number;
//   date: string;
//   last_review_month: number;
//   end_time: string;
//   start_time: string;
//   review_type: string;
//   odometer: number;
//   diff_previous_odometer: number;
//   observation?: string;
//   history: number;
//   created_by: number;
//   updated_by: number;
//   old_vehicle_review_id?: number;
//   created_at: string;
//   updated_at: string;
// }

interface DriverResponseInput {
  driver_id: number;
  name: string;
  status: number;
}
