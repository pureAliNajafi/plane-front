import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  authPending: boolean; // ✅ Clear, short, and professional
  setAuthenticateStatus: (status: boolean) => void;
  setAuthPending: (status: boolean) => void; // ✅ Simple and meaningful
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  authPending: true,

  setAuthenticateStatus: (status) => set({ isAuthenticated: status }),

  setAuthPending: (status) => set({ authPending: status }), // ✅ More readable
}));

export default useAuthStore;
