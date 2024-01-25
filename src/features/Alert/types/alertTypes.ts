export type {
  AlertResponse,
  AlertUpdateData,
  AlertCreateData,
  AlertStatusData,
};

interface AlertResponse {
  alert_id: number;
  alert_type: string;
  code: string;
  colloquial_name: string;
  created_at: string;
  details: string;
  priority: string;
  ranking_alert: string;
  status: number;
  suggestion: string;
  updated_at: string;
}

interface AlertCreateData {
  code: string;
  alert_type: string;
  ranking_alert: string;
  priority: string;
  details: string;
  suggestion: string;
}

interface AlertUpdateData {
  code: string;
  alert_type: string;
  ranking_alert: string;
  priority: string;
  details: string;
  suggestion: string;
}

interface AlertStatusData {
  status: number;
}
