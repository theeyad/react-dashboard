import { create } from "zustand";

interface TaskFilterStore {
  search: string;
  status: "all" | "completed" | "pending";
  userId: number | null;
  setSearch: (q: string) => void;
  setStatus: (s: "all" | "completed" | "pending") => void;
  setUserId: (id: number | null) => void;
  reset: () => void;
}

export const useTaskFilterStore = create<TaskFilterStore>((set) => ({
  search: "",
  status: "all",
  userId: null,
  setSearch: (q) => set({ search: q }),
  setStatus: (s) => set({ status: s }),
  setUserId: (id) => set({ userId: id }),
  reset: () => set({ search: "", status: "all", userId: null }),
}));

