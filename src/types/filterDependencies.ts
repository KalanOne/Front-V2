interface FilterBrands {
  brand_id: number;
  name: string;
  status: number;
  approved: number;
}

interface FilterModels {
  tire_model_id: number;
  tire_model: TireModel;
}

interface TireModel {
  tire_model_id: number;
  name: string;
  status: number;
  approved: number;
}

interface FilterVariations {
  approved: number;
  number_layers: number;
  status: number;
  tire_model_variation_id: number;
  tire_size: TireSize;
  tire_size_id: number;
}

interface TireSize {
  size: string;
  tire_size_id: number;
}

interface FilterRevitalizedModels {
  name: string;
  revitalized_tire_model_id: number;
  status: number;
}

interface FilterSizes {
  tire_size_id: number;
  size: string;
  status: number;
}

interface FilterProviders {
  name: string;
  provider_id: number;
  status: number;
}

interface FilterVehicles {
  economic_number: string;
  status: number;
  vehicle_id: number;
  vehicle_review: VehicleReviewInput[];
}

interface VehicleReviewInput {
  created_at: string;
  created_by: number;
  date: string;
  diff_previous_odometer: number;
  end_time: string;
  history: number;
  last_review_month: number;
  observation: unknown;
  odometer: number;
  old_vehicle_review_id: unknown;
  review_type: string;
  start_time: string;
  updated_at: string;
  updated_by: number;
  vehicle_id: number;
  vehicle_review_id: number;
}

interface FilterCorporates {
  corporate_id: number;
  name: string;
  status: number;
}

interface FilterCompanies {
  company_id: number;
  name: string;
  status: number;
}

interface FilterSubsidiaries {
  subsidiary_id: number;
  name: string;
  status: number;
}

interface FilterDivisions {
  division_id: number;
  name: string;
  status: number;
  subsidiary_id: number;
  subsidiary: FilterSubsidiaries;
}

interface FilterWareHouses {
  name: string;
  warehouse_id: number;
  status: number;
}

interface FilterAssociation {
  association_id: number;
  name: string;
  status: number;
}

interface FilterVehicleTypes {
  vehicle_type_id: number;
  name: string;
  status: number;
}

interface FilterDrivers {
  driver_id: number;
  name: string;
  status: number;
}
