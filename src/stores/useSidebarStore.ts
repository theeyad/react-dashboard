import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarToggler: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      sidebarToggler: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: "sidebar-storage",
      partialize: (state) => ({ sidebarOpen: state.sidebarOpen }),
    },
  ),
);

