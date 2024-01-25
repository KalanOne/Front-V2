import { create } from "zustand";

import { FavoriteReportUser } from "src/features/Login/types/favoriteReportsTypes";

type State = {
  favoriteReportsList: FavoriteReportUser[];
};

type Action = {
  addFavoriteReport: (newFavoriteReport: FavoriteReportUser) => void;
  removeFavoriteReport: (favoriteReportUserId: number) => void;
  setFavoriteReports: (newFavoriteReports: FavoriteReportUser[]) => void;
};

const useFavoriteReportStore = create<State & Action>((set) => ({
  favoriteReportsList: [],

  addFavoriteReport: (newFavoriteReport: FavoriteReportUser) =>
    set((state) => ({
      favoriteReportsList: [...state.favoriteReportsList, newFavoriteReport],
    })),

  removeFavoriteReport: (favoriteReportUserId: number) =>
    set((state) => ({
      favoriteReportsList: state.favoriteReportsList.filter(
        (report: FavoriteReportUser) =>
          report.favorite_report_user_id !== favoriteReportUserId,
      ),
    })),

  setFavoriteReports: (newFavoriteReports: FavoriteReportUser[]) =>
    set(() => ({
      favoriteReportsList: newFavoriteReports,
    })),
}));

export default useFavoriteReportStore;
