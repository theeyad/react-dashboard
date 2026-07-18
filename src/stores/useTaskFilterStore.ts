interface TaskFilterStore {
  search: string;
  status: "all" | "completed" | "pending";
  userId: number | null;
  setSearch: (q: string) => void;
  setStatus: (s: "all" | "completed" | "pending") => void;
  setUserId: (id: number | null) => void;
  reset: () => void;
}
