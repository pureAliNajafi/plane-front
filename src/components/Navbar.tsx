"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import LoadingSpinner from "./LoadingSpinner";

const Navbar = () => {
  const { authPending, isAuthenticated } = useAuthStore();

  /*   useEffect(() => {
    checkAuthStatusAction().then(setIsAuthenticated);
  }, []); */
  return (
    <nav className="bg-slate-200">
      <div className="flex justify-between m-auto max-w-screen-lg p-5">
        <div>
          <Link href="/">🛫 Warbirds</Link>
        </div>
        <ul className="flex gap-5">
          <li>
            <Link href="/flying-machines">Flying Machines</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li className="min-w-14">
            {/* <Link href="/profile" className=" font-bold">
              -profile-
            </Link>
            <span>------</span>
            <Link href="/auth/sign-in" className=" font-bold">
              -sign In-
            </Link> */}
            {authPending ? (
              <span className="flex items-center justify-center">
                <LoadingSpinner className="w-4 h-4" />
              </span>
            ) : isAuthenticated ? (
              <Link href="/profile" className="text-blue-500 font-bold">
                Profile
              </Link>
            ) : (
              <Link href="/auth/sign-in" className="text-green-500 font-bold">
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
