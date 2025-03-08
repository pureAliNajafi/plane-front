"use client";
import LogOutButton from "@/components/auth/LogOutButton";
import Counter from "@/components/Counter";
import useCounterStore from "@/store/counterStore";

export default function Page() {
  // const { isAuthenticated, logout } = useAuthStore();
  const { count } = useCounterStore();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl">Profile</h1>
      <div className="border-2 border-gray-400 p-3">
        <h3 className="text-xl font-bold text-orange-400">Count: {count}</h3>
        <Counter />
      </div>
      <div>
        <LogOutButton />
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
