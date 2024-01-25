import { create } from "zustand";

export { useProgress };

interface ProgressState {
  progresses: string[];
  addProgress: (progressId: string) => void;
  removeProgress: (progressId: string) => void;
}

const useProgress = create<ProgressState>()((set) => ({
  progresses: [],
  addProgress: (progressId: string) =>
    set((state) => ({
      progresses: [...state.progresses, progressId],
    })),
  removeProgress: (progressId) =>
    set((state) => ({
      progresses: state.progresses.filter((id) => id !== progressId),
    })),
}));
