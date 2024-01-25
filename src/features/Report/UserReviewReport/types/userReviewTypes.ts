interface ReviewResponse {
  review: Review;
}

interface Review {
  corporate: Corporate[];
}

interface Corporate {
  company: Company[];
  percent: number;
  statistics: number;
}

interface Company {
  subsidiary: Subsidiary[];
  percent: number;
  statistics: number;
}

interface Subsidiary {
  division: Division[];
  percent: number;
  statistics: number;
}

interface Division {
  user: User[];
  percent: number;
  statistics: number;
}

interface User {
  vehicleType: VehicleType[];
  percent: number;
  statistics: number;
}

interface VehicleType {
  totalStructure: number;
  percent: number;
  statistics: number;
}
