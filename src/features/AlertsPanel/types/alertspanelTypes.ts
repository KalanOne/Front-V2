import { CreatedBy } from "src/types/response";

export type {
  AlertsPanelResponse,
  TypesAlerts,
  Alert,
  TypesAlertsDamages,
  TypesAlertsWears,
  AlertWears,
  AlertDamages,
  AlertsPanelResponseGraphics,
  TireAlertsPanelResponseTable,
  VehicleAlertsPanelResponseTable,
  MountAlertsPanelResponseTable,
  DamageAlertsPanelResponseTable,
  WearAlertsPanelResponseTable,
};

interface Alert {
  alert_id: number;
  details: string;
  priority: string;
  ranking_alert: string;
  colloquial_name: string;
  statistics: number;
  percent: number;
}

interface TypesAlerts {
  [key: string]: Alert;
}

interface AlertWears {
  name: string;
  attribution: string;
  frequency: number;
  wear_id: number;
  statistics: number;
  percent: number;
}

interface AlertDamages {
  name: string;
  attribution: string;
  frequency: number;
  damage_id: number;
  statistics: number;
  percent: number;
}

interface TypesAlertsDamages {
  [key: string]: AlertDamages;
}

interface TypesAlertsWears {
  [key: string]: AlertWears;
}

interface AlertsPanelResponse {
  Tires: TypesAlerts;
  Mounts: TypesAlerts;
  Vehicle: TypesAlerts;
  Damages: TypesAlertsDamages;
  Wear: TypesAlertsWears;
}

interface AlertsPanelResponseGraphics {
  date: string;
  total: number;
}

interface TireAlertsPanelResponseTable {
  created_at: string;
  code: string;
  device_code?: string;
  location: string;
  real_position?: number;
  alert_code: string;
  alert_id: number;
  details: string;
  colloquial_name: string;
}

interface VehicleAlertsPanelResponseTable {
  alert_code: string;
  details: string;
  economic_number: string;
  TYPE: string;
  created_at: string;
  colloquial_name: string;
}

interface MountAlertsPanelResponseTable {
  tire_review_date: string;
  tire_review_id: number;
  created_at: string;
  code: string;
  device_code?: string;
  location: string;
  real_position: number;
  alert_code: string;
  details: string;
  colloquial_name: string;
  updated_at: string;
}

interface DamageAlertsPanelResponseTable {
  tire_damage_id: number;
  area: string;
  attribution: string;
  comment?: string;
  created_by: CreatedBy;
  code: string;
  name: string;
  device_code?: string;
  created_at: string;
  updated_by: CreatedBy;
}

interface WearAlertsPanelResponseTable {
  tire_wear_id: number;
  attribution: string;
  name: string;
  comment: string;
  created_by: CreatedBy;
  code: string;
  device_code?: string;
  created_at: string;
  updated_by: CreatedBy;
}
