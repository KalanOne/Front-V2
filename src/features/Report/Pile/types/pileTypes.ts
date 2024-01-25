export type {
  PileHistoricResponse,
  PileResponsibleTableResponse,
  PileModelTableResponse,
};

interface PileHistoricResponse {
  fecha: string;
  cantidad: number;
}

interface PileResponsibleTableResponse {
  date: string;
  retirement_cause_name: string;
  number_cycle: number;
  corporate_name: string;
  subsidiary_id: number;
  company_id: number;
  corporate_id: number;
  tire_id: number;
  code: string;
  cost: number;
  remainder_depth: number;
  cpd: number;
  cpk: number;
  attribution: string;
  retirement_cause_image: string;
  utils_mm: number;
}

interface PileModelTableResponse {
  date: string;
  model: string;
  tire_application_id: string;
  division_name: string;
  subsidiary_name: string;
  company_name: string;
  corporate_name: string;
  tire_id: number;
  code: string;
  device_code: any;
  cost: number;
  remainder_depth: number;
  cpd: number;
  cpk: number;
  tire_size: string;
  number_layers: number;
  number_cycle: number;
  utils_mm: number;
}
