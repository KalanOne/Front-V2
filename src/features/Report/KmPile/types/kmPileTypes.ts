export type {
  KmPileHistoricResponse,
  KmPileResponsibleTableResponse,
  KmPileModelTableResponse,
};

interface KmPileHistoricResponse {
  fecha: string;
  cantidad: number;
}

interface KmPileResponsibleTableResponse {
  date: string;
  retirement_cause_name: string;
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
  number_cycle: number;
  attribution: string;
  retirement_cause_image: string;
}

interface KmPileModelTableResponse {
  model: string;
  tire_application_id: string;
  division_name: string;
  subsidiary_name: string;
  company_name: string;
  corporate_name: string;
  tire_id: number;
  code: string;
  cost: number;
  tire_travel: number;
  cpk: number;
  number_cycle: number;
  days_in_service: string;
  tire_review_date: string;
}
