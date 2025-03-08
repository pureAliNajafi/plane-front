"use client";
import Counter from "@/components/Counter";
import { useAuthStore } from "@/store/authStore";
import useCounterStore from "@/store/counterStore";

export default function Page() {
  // const { isAuthenticated, logout } = useAuthStore();
  const { count } = useCounterStore();
  return (
    <div>
      <h2>Profile</h2>
      <div className="border-2 border-gray-400 p-3">
        <h1 className="text-2xl font-bold text-orange-400">Count: {count}</h1>
        <Counter />
      </div>
      {/*       {isAuthenticated ? (
        <>
          <p>Welcome! You are logged in.</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please log in.</p>
      )} */}
    </div>
  );
}
