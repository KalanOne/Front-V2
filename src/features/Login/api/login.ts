import { http } from "src/api/api.ts";
import { MessageResponse } from "src/types/response";

import { FavoriteReportUser } from "../types/favoriteReportsTypes";

export {
  login,
  logout,
  getFavoriteReports,
  addFavoriteReport,
  deleteFavoriteReport,
};

interface LoginData {
  email: string;
  password: string;
}

async function login(data: LoginData): Promise<string> {
  return await http<string>({
    method: "POST",
    path: "auth/login",
    data: data,
  });
}

async function logout(): Promise<any> {
  return await http<string>({
    method: "POST",
    path: "auth/logout",
  });
}

async function getFavoriteReports(): Promise<FavoriteReportUser[]> {
  return await http<FavoriteReportUser[]>({
    method: "GET",
    path: "favorite/report",
  });
}

async function addFavoriteReport(name: string): Promise<FavoriteReportUser> {
  return await http<FavoriteReportUser>({
    method: "POST",
    path: "favorite/report",
    data: { favorite_report_name: name },
  });
}

async function deleteFavoriteReport(id: number): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `favorite/report/${id}`,
  });
}
