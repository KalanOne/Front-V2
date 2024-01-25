export type {
  RetirementCauseResponse,
  RetirementCauseCreateData,
  RetirementCauseUpdateData,
  RetirementCauseStatusData,
};

interface RetirementCauseResponse {
  archived: number;
  attribution: string;
  avoidable: number;
  created_at: string;
  description: string;
  image: string;
  name: string;
  retirement_cause_id: number;
  status: number;
  updated_at: string;
}

interface RetirementCauseCreateData {
  name: string;
  description: string;
}

interface RetirementCauseUpdateData {
  name: string;
  description: string;
}

interface RetirementCauseStatusData {
  status: number;
}
