import { loginPassword, loginUserName, loginFullName } from "@/data/loginData";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  userName: string;
  fullName: string;
};

interface AuthStore {
  user: User | null;
  login: (credentials: {
    userName: string;
    password: string;
  }) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,

      login: (credentials) => {
        const isValid =
          credentials.userName.trim() !== "" &&
          credentials.password.trim() !== "" &&
          credentials.userName === loginUserName &&
          credentials.password === loginPassword;

        if (!isValid) return false;

        set({
          user: {
            userName: credentials.userName,
            fullName: loginFullName,
          },
        });
        return true;
      },

      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
