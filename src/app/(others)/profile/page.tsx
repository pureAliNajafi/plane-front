"use client";
import LogOutButton from "@/components/auth/LogOutButton";
import Counter from "@/components/Counter";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getPublicAuthData } from "@/lib/cookies/client";
import useCounterStore from "@/store/counterStore";
import { LikeValidator } from "@hookform/resolvers/fluentvalidation-ts/src/__tests__/__fixtures__/data.js";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  // const { isAuthenticated, logout } = useAuthStore();
  const { count } = useCounterStore();
  const [userdata, setUserdata] = useState<any>(null);
  useEffect(() => {
    const { username, email } = getPublicAuthData();
    setUserdata({ username, email });
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl">Profile</h1>
      <div className="border-2 border-gray-400 p-3">
        <h3 className="text-xl font-bold text-orange-400">Count: {count}</h3>
        <Counter />
      </div>
      <div className="h-10 w-full flex items-center">
        {userdata ? (
          <div>
            {userdata.username}
            <br />
            {userdata.email}
          </div>
        ) : (
          <LoadingSpinner className="h-10 w-10" />
        )}
      </div>

      <div>
        <Link href={"/profile/liked-machines"} className="text-sky-500">
          See Liked History
        </Link>
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
