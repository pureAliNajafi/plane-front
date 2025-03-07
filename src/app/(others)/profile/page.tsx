"use client";
import { useAuthStore } from "@/store/authStore";

export default function Page() {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome! You are logged in.</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
}
