interface UIStore {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}
