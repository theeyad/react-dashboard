import { create } from "zustand";

export interface modalStore {
  activeModal: number | null;
  openModal: (modalId: number) => void;
  closeModal: () => void;
}

export const useModalStore = create<modalStore>((set) => ({
  activeModal: null,
  openModal: (modalId: number) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
}));