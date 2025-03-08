"use client";
import { deleteAuthCookies } from "@/lib/cookies/auth";
import useAuthStore from "@/store/authStore";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const LogOutButton = () => {
  // {authPending ? "Checking authentication..." : isAuthenticated ? "Authenticated" : null}
  const { setAuthenticateStatus } = useAuthStore();
  const router = useRouter(); // ✅ Get client-side router

  const handleLogout = async () => {
    deleteAuthCookies();
    setAuthenticateStatus(false);
    router.push("/auth/sign-in");
  };
  return (
    <button onClick={handleLogout} className="border-2 border-red-500 text-red-500 p-3">
      Log Out
    </button>
  );
};

export default LogOutButton;
