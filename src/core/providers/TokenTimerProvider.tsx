"use client";
import { deleteAuthCookiesAction } from "@/actions/auth/delete-cookies";
import { getPublicAuthData } from "@/lib/cookies/client";
import useAuthStore from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const TokenTimerProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, setAuthenticateStatus } = useAuthStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Effect for setting up the interval and checking remaining time
  useEffect(() => {
    if (!isAuthenticated) return;

    const expire = getPublicAuthData().expire;
    if (!expire) return;

    console.log("Token Expiration Time:", expire);

    const updateTimer = () => {
      const remaining = expire - Date.now();

      if (remaining <= 0) {
        console.log("Session expired.");
        setAuthenticateStatus(false);
        deleteAuthCookiesAction();
        toast.warning(
          <>
            <div style={{ padding: "6px", fontSize: "14px" }}>
              <p>Your session expired. Sign in to access your account features.</p>
              <div style={{ marginTop: "8px" }}>
                {" "}
                {/* Add spacing above button */}
                <button
                  style={{
                    color: "#fff", // White text
                    background: "#6366f1", // Indigo-400 background
                    padding: "8px 14px", // Bigger padding
                    border: "none", // Remove border for cleaner look
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "background 0.2s ease-in-out",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#4f46e5")} // Slightly darker on hover
                  onMouseOut={(e) => (e.currentTarget.style.background = "#6366f1")}
                  onClick={() => router.push("/auth/sign-in")}
                >
                  Sign in
                </button>
              </div>
            </div>
          </>,
          {
            icon: <>⏳</>,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

        clearInterval(intervalRef.current as NodeJS.Timeout);
      }
    };

    updateTimer();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAuthenticated]);

  /*   useEffect(() => {
    // ✅ Fix for middleware-triggered redirection issue (explained below)
    if (pathname.includes("/auth/sign-in")) router.replace("/auth/sign-in");
  }, [pathname]);
 */
  return <>{children}</>;
};

export default TokenTimerProvider;
// ✅ Fix for middleware-triggered redirection issue
// When the token expires, `deleteAuthCookiesAction()` removes authentication cookies.
// This causes Next.js middleware to run again, redirecting the user to `/auth/sign-in`.
// However, because middleware redirects **before rendering**, the browser URL does not update correctly.
// The user is actually on `/auth/sign-in`, but the address bar still shows the previous page (e.g., `/profile`).
// This line ensures that if the user is already redirected, we manually trigger `router.replace("/auth-sign-in")`
// to correctly update the browser's URL and reflect the actual page.

/* "use client";
import { usePathname, useRouter } from "next/navigation";
import { getPublicAuthData } from "@/lib/cookies/client";
import { deleteAuthCookies } from "@/lib/cookies/server";
import useAuthStore from "@/store/authStore";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { deleteAuthCookiesAction } from "@/actions/auth/delete-cookies";

const TokenTimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const { isAuthenticated, setAuthenticateStatus } = useAuthStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Effect for setting up the interval and checking remaining time
  useEffect(() => {
    if (!isAuthenticated) return;

    const expire = getPublicAuthData().expire;
    if (!expire) return;

    console.log("Token Expiration Time:", expire);

    const updateTimer = () => {
      const remaining = expire - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);

      if (remaining <= 0) {
        console.log("Session expired.");
        setAuthenticateStatus(false);
        deleteAuthCookiesAction();
        toast.error("⚠️ Your session has expired. Please sign in again to continue.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // ✅ Fix for middleware-triggered redirection issue
        // When the token expires, `deleteAuthCookiesAction()` removes authentication cookies.
        // This causes Next.js middleware to run again, redirecting the user to `/auth/sign-in`.
        // However, because middleware redirects **before rendering**, the browser URL does not update correctly.
        // The user is actually on `/auth/sign-in`, but the address bar still shows the previous page (e.g., `/profile`).
        // This line ensures that if the user is already redirected, we manually trigger `router.replace("/auth-sign-in")`
        // to correctly update the browser's URL and reflect the actual page.

        if (pathname.includes("/auth/sign-in")) router.replace("/auth/sign-in"); // ✅ Fixes URL not updating in browser

        clearInterval(intervalRef.current as NodeJS.Timeout);
      }
    };

    updateTimer();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default TokenTimerProvider;
 */
