"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import { getPublicAuthData } from "@/lib/cookies/client";

export default function ZustandProvider({ children }: { children: React.ReactNode }) {
  const { setAuthPending, setAuthenticateStatus } = useAuthStore();

  useEffect(() => {
    const { email } = getPublicAuthData();
    if (email) {
      setAuthenticateStatus(true);
    }
    setAuthPending(false);
    console.log("token:", email);
  }, []);

  return <>{children}</>;
}
/* "use client";

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

  return <>{children}</>;
}
 */
