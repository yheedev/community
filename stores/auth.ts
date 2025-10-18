import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User } from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  user: User | null;
  initializing: boolean;
  setUser: (u: User | null) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      initializing: true,
      setUser: (u) => set({ user: u }),
      reset: () => set({ user: null }),
    }),
    {
      name: "auth-store",
      partialize: (s) => ({ user: s.user }),
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
