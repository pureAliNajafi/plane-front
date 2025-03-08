"use client";

import { useEffect } from "react";
import { checkTokenAction } from "@/actions/auth/auth-status";
import useAuthStore from "@/store/authStore";

export default function ZustandProvider({ children }: { children: React.ReactNode }) {
  const { authPending, setAuthPending, isAuthenticated, setAuthenticateStatus } = useAuthStore();

  useEffect(() => {
    checkTokenAction()
      .then((res) => setAuthenticateStatus(res))
      .catch((err) => console.log(err))
      .finally(() => {
        setAuthPending(false);
      });
  }, [setAuthenticateStatus, setAuthPending]);

  return (
    <>
      {authPending
        ? "Checking authentication..."
        : isAuthenticated
        ? "Authenticated"
        : "not Authenticated"}
      {children}
    </>
  );
}
