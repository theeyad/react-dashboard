import { loginPassword, loginUserName } from "@/data/loginData";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  userName: string;
  fullName: string;
  password: string;
};

interface AuthStore {
  user: User;
  login: (credentials: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: { userName: "", fullName: "", password: "" },

      login: (credentials) => {
        set((state) => ({
          user: {
            ...state.user,
            userName: credentials.userName,
            fullName: credentials.fullName,
            password: credentials.password,
          },
        }));
      },

      logout: () => {
        set({
          user: { userName: "", fullName: "", password: "" },
        });
      },

      isAuthenticated: () => {
        return (
          get().user.userName === loginUserName &&
          get().user.password === loginPassword
        );
      },
    }),
    { name: "user-storage" },
  ),
);
