interface UIStore {
  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}
