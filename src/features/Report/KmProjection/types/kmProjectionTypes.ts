export type { KmProjectionResponse, TireApplicationResponse };

interface KmProjectionResponse {
  general: Corporate;
}

interface Corporate {
  company: Company[];
  cpk: number;
  kmmm: number;
  projection: number;
}

interface Company {
  subsidiary: Subsidiary[];
  cpk: number;
  kmmm: number;
  projection: number;
}

interface Subsidiary {
  division: Division[];
  cpk: number;
  kmmm: number;
  projection: number;
}

interface Division {
  tire_application: TireApplication[];
  cpk: number;
  kmmm: number;
  projection: number;
}

interface TireApplication {
  model: Model[];
  cpk: number;
  kmmm: number;
  projection: number;
}

interface TireApplicationResponse {
  models: Model[];
}

interface Model {
  tire: Tire[];
  cpk: number;
  kmmm: number;
  projection: number;
}

interface Tire {
  date: string;
  tire_id: number;
  tire_application_id: string;
  division_name: string;
  subsidiary_name: string;
  company_name: string;
  corporate_name: string;
  code: string;
  cpd: number;
  cpk: number;
  projection: number;
  kmmm: number;
  model: string;
  movement: string;
  tire_travel: number;
}
