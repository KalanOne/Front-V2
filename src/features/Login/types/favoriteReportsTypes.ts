export type { FavoriteReportUser };

interface FavoriteReport {
  favorite_report_id: number;
  favorite_report_name: string;
  favorite_report_description: string;
  favorite_report_url: string;
  archived: number;
}

interface FavoriteReportUser {
  favorite_report_user_id: number;
  user_id: number;
  favorite_report_id: number;
  archived: number;
  created_at: string;
  updated_at: string;
  favorite_report: FavoriteReport;
}
