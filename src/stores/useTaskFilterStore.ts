import { create } from "zustand";

interface TaskFilterStore {
  search: string;
  status: "all" | "completed" | "pending";
  setSearch: (q: string) => void;
  setStatus: (s: "all" | "completed" | "pending") => void;
  reset: () => void;
}

export const useTaskFilterStore = create<TaskFilterStore>((set) => ({
  search: "",
  status: "all",
  setSearch: (q) => set({ search: q }),
  setStatus: (s) => set({ status: s }),
  reset: () => set({ search: "", status: "all" }),
}));

