export type { DynamicCostResponse };

interface DynamicCostResponse {
  general: Corporate;
}

interface Corporate {
  company: Company[];
}

interface Company {
  subsidiaries: Subsidiary[];
  cpd: number;
  cpk: number;
  depth_average: number;
  depth_sumary: number;
  kmmm: number;
  percent: number;
  remainder_depth: number;
  statistics: number;
  travel_average: number;
  travel_summary: number;
}

interface Subsidiary {
  divisions: Division[];
  cpd: number;
  cpk: number;
  depth_average: number;
  depth_sumary: number;
  kmmm: number;
  percent: number;
  remainder_depth: number;
  statistics: number;
  travel_average: number;
  travel_summary: number;
}

interface Division {
  applications: Application[];
  cpd: number;
  cpk: number;
  depth_average: number;
  depth_sumary: number;
  kmmm: number;
  percent: number;
  remainder_depth: number;
  statistics: number;
  travel_average: number;
  travel_summary: number;
}

interface Application {
  application: string;
  sizes: Size[];
  depth_summary: number;
  travel_summary: number;
  depth_average: number;
  travel_average: number;
  cpd: number;
  cpk: number;
  remainder_depth: number;
  kmmm: number;
  statistics: number;
}

interface Size {
  size: string;
  models: Model[];
  depth_summary: number;
  travel_summary: number;
  depth_average: number;
  travel_average: number;
  cpd: number;
  cpk: number;
  remainder_depth: number;
  kmmm: number;
  statistics: number;
  percent: number;
}

interface Model {
  model: string;
  depth_summary: number;
  travel_summary: number;
  remainder_depth: number;
  depth_average: number;
  travel_average: number;
  cpd: number;
  cpk: number;
  kmmm: number;
  statistics: number;
  percent: number;
}
