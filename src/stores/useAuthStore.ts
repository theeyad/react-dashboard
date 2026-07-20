import { loginPassword, loginUserName } from "@/data/loginData";
import { fullName, email, avatar } from "@/data/userData";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  userName: string;
  fullName: string;
  email: string;
  avatar: string;
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
            fullName: fullName,
            email: email,
            avatar: avatar,
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
