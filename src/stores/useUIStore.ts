import { create } from "zustand";

export interface UIStore {
  activeModal: number | null;
  openModal: (modalId: number) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  activeModal: null,
  openModal: (modalId: number) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
}));