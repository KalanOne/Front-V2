export type { ReviewData, ReviewPressureData };

interface ReviewData {
  date: string;
  odometer: number;
  review_type: string;
}

interface ReviewPressureData {
  review: {
    movement_tire_id: string;
    pressure: number;
  }[];
}
