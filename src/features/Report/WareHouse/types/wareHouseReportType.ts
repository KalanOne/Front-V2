export type { WareHouseReportResponse };

interface WareHouseReportResponse {
  corporate: Corporate;
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
  warehouse: WareHouse[];
  percent: number;
  statistics: number;
}

interface WareHouse {
  original_used: Condition[];
  original_new: Condition[];
  retread_new: Condition[];
  retread_used: Condition[];
  percent: number;
  statistics: number;
}

interface Condition {
  critical_withdrawal: Policy[];
  good_condition: Policy[];
  scheduled_withdrawal: Policy[];
  percent: number;
  statistics: number;
}

interface Policy {
  all_posotion: TireAplication[];
  directional: TireAplication[];
  traction: TireAplication[];
  trailer: TireAplication[];
  percent: number;
  statistics: number;
}

interface TireAplication {
  date: string;
  subsidiary_name: string;
  company_name: string;
  corporate_name: string;
  warehouse_name: string;
  tire_id: number;
  code: string;
  device_code: any;
  tire_application_id: string;
  tire_condition_id: string;
  movement_date: string;
  movement_tire_id: number;
  model: string;
  size: string;
  depth: number;
  depth_condition: string;
}
