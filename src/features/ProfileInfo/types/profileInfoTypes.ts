export type { ProfileInfoUpdateData, ProfileInfoResponse };

interface ProfileInfoUpdateData {
  password?: string;
  preferred_language: string;
}

interface ProfileInfoResponse {
  status: boolean;
  data: ProfileInfo;
}

interface ProfileInfo {
  user_id: number;
  name: string;
  last_name_1: string;
  last_name_2?: string;
  status: string;
  email: string;
  preferred_language: string;
  need_change_password: number;
  is_root: number;
  archived: number;
  created_by: number;
  updated_by: number;
  old_user_id: string;
  created_at: string;
  updated_at: string;
}
