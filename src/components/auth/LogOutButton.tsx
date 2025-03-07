"use client";
import { logoutAction } from "@/actions/auth/log-out";
import { redirect } from "next/navigation";
import React from "react";

const LogOutButton = () => {
  const handleLogout = async () => {
    logoutAction();
    // ✅ Redirect to sign-in after logout
  };
  return (
    <button onClick={handleLogout} className="border-2 border-red-500 text-red-500 p-3">
      Log Out
    </button>
  );
};

export default LogOutButton;
