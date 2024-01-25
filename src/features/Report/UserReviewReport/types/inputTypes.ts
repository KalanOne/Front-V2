export type {
  CorporateInputResponse,
  UserInputResponse,
  DivisionResponseInput,
  CompanyInputResponse,
  SubsidiaryInputResponse,
};

interface CorporateInputResponse {
  corporate_id: number;
  name: string;
  status: number;
}
interface UserInputResponse {
  user_id: number;
  name: string;
  last_name_1: string;
  last_name_2: string;
}
interface DivisionResponseInput {
  division_id: number;
  name: string;
  status: number;
}

interface CompanyInputResponse {
  company_id: number;
  name: string;
  status: number;
}

interface SubsidiaryInputResponse {
  subsidiary_id: number;
  name: string;
  status: number;
}
