import { VehicleReview } from "src/features/Tire/Tire/types/tireTypes";

export type {
  VehicleResponse,
  StartReviewData,
  UpdateReviewData,
  PathdamageUpdateData,
  PhysicalDifferenceUpdateData,
};

interface VehicleResponse {
  vehicle_id: number;
  economic_number: string;
  status: number;
  vehicle_review: VehicleReview;
}

interface StartReviewData {
  date: string;
  observation: string;
  odometer: number;
  review_type: string;
}

interface UpdateReviewData {
  date: string;
  observation: string;
  odometer: number;
}

interface PathdamageUpdateData {
  id: string | number;
  damages: { damage_id: string; comment: string; image: File | null }[];
  provider_id: number;
  price: number;
  invoice_date?: string;
  invoice_folio?: string;
  surcharge?: number;
  driver_id?: number;
  surcharge_item?: string;
}

interface PhysicalDifferenceUpdateData {
  id: string | number;
  code?: string;
  device_code?: string;
  required: number;
  vehicle_type_axle_tire_id: number;
}
