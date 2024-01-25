export type { SummaryResponse };

interface SummaryResponse {
  tires_fleet: number;
  tires_fleet_percentage: number;
  tires_review: number;
  tires_review_percentage: number;
  good_depth: number;
  schedule_depth: number;
  critical_depth: number;
  good_pressure: number;
  no_pressure: number;
  high_pressure: number;
  low_pressure: number;
  original_tires: number;
  revitalized_tires: number;
  all_position: number;
  trailer: number;
  traction: number;
  directional: number;
}
