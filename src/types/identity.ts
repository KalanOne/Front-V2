export type { Account, WorkArea, Corporate, Company, Subsidiary };

interface Corporate {
  archived: number;
  corporate: {
    corporate_id: number;
    logo: string | null;
    name: string;
    status: number;
  };
  corporate_id: number;
  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
  user_assigned_corporate_id: number;
  user_id: number;
}

interface Company {
  archived: number;
  company: {
    company_id: number;
    corporate_id: number;
    logo: string | null;
    name: string;
    status: number;
  };
  company_id: number;
  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
  user_assigned_company_id: number;
  user_id: number;
}

interface Policy {
  policy_id: number;
  subsidiary_id: number;
  number_cycle: number;
  inspection: number;
  depth_sampling: number;
  pressure_type_axle: number;
  tolerance_inflation_pressure: number;
  tolerance_mating_pressure: number;
  tolerance_directional_mating_depth: number;
  tolerance_mating_depth: number;
  helmet_policy: number;
  directional_tire_rotation: number;
  tire_rotation: number;
  refection_review: number;
  tire_condition_axle_type: number;
  show_alerts_different_assignment: number;
  send_pressure_setting: number;
  operator_edit: number;
  created_by: number;
  updated_by: number;
  old_subsidiary_id: number | null;
  created_at: string | null;
  updated_at: string;
}

interface Role {
  created_by: number;
  role: string;
  user_assigned_subsidiary_id: number;
  user_role_assigned_subsidiary_id: number;
}

interface Subsidiary {
  archived: number;
  created_at: string;
  created_by: number;
  role: Role[];
  subsidiary: {
    company: {
      company_id: number;
      name: string;
    };
    company_id: number;
    policy: Policy;
    name: string;
    status: number;
    subsidiary_id: number;
  };
  subsidiary_id: number;
  updated_at: string;
  updated_by: number;
  user_assigned_subsidiary_id: number;
  user_id: number;
}

interface Account {
  archived: number;
  companies: Company[];
  corporates: Corporate[];
  created_at: string;
  created_by: number;
  email: string;
  is_root: number;
  last_name_1: string | null;
  last_name_2: string | null;
  name: string;
  need_change_password: number;
  old_user_id: number | null;
  permits: any[];
  preferred_language: string;
  status: number;
  subsidiaries: Subsidiary[];
  updated_at: string;
  updated_by: number;
  user_id: number;
}

interface WorkArea {
  key: string;
  id: number;
  name: string;
  company: string;
  status: number;
  area: string;
  roles: string;
}
