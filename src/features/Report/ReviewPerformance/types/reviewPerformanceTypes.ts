export type { ReviewPerformanceResponse };

interface ReviewPerformanceResponse {
  subsidiaries: Subsidiaries[];
}

interface Subsidiaries {
  reviews: Review[];
}

interface Review {
  review_performance_id: number;
  corporate_id: number;
  company_id: number;
  subsidiary_id: number;
  number_damage: number;
  punctures: number;
  number_revitalizations: number;
  number_tires_pile: number;
  number_tires_review: number;
  number_tires: number;
  number_review: number;
  number_vehicles_review: number;
  number_vehicles: number;
  number_vehicles_no_review: number;
  created_at: string;
  subsidiary: Subsidiary;
}

export interface Subsidiary {
  subsidiary_id: number;
  company_id: number;
  name: string;
  country: string;
  state: string;
  province: string;
  direction_1: string;
  direction_2: string;
  postal_code: string;
  external_number: string;
  internal_number: any;
  status: number;
  archived: number;
  created_by: number;
  updated_by: number;
  old_subsidiary_id: number;
  created_at: string;
  updated_at: string;
}
