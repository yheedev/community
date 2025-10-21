import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User } from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserPublic = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
} | null;

type SignUpDraft = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  // 런타임 전용(비영속)
  user: User | null;
  initializing: boolean;

  // AsyncStorage에 저장할 최소 정보
  userPublic: UserPublic;

  // 회원가입 폼 임시값(비영속)
  signUpDraft: SignUpDraft;

  // actions
  setUser: (u: User | null) => void;
  setUserPublicFromUser: (u: User | null) => void;
  setInitializing: (b: boolean) => void;

  // draft helpers
  setSignUpField: <K extends keyof SignUpDraft>(k: K, v: SignUpDraft[K]) => void;
  resetSignUpDraft: () => void;

  // 로그아웃/초기화
  reset: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      initializing: true,

      userPublic: null,

      signUpDraft: {
        id: "",
        email: "",
        name: "",
      },

      setUser: (u) => set({ user: u }),
      setUserPublicFromUser: (u) =>
        set({
          userPublic: u
            ? {
                uid: u.uid,
                email: u.email ?? null,
                displayName: u.displayName ?? null,
                photoURL: u.photoURL ?? null,
              }
            : null,
        }),

      setInitializing: (b) => set({ initializing: b }),

      setSignUpField: (k, v) => set((s) => ({ signUpDraft: { ...s.signUpDraft, [k]: v } })),

      resetSignUpDraft: () => set({ signUpDraft: { id: "", email: "", name: "" } }),

      reset: () =>
        set({
          user: null,
          userPublic: null,
          signUpDraft: { id: "", email: "", name: "" },
          initializing: false,
        }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        userPublic: s.userPublic,
      }),
    }
  )
);
