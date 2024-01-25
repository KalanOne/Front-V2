export type { MessageResponse, PaginatedResponse, CreatedBy };

interface MessageResponse {
  message: string;
  code: string;
  expression: string;
}

interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string | null;
  from: number;
  last_page: number;
  last_page_url: string | null;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface CreatedBy {
  email: string;
  last_name_1: string;
  last_name_2: string;
  name: string;
  user_id: number;
}

