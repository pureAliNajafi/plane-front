"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";

const Navbar = () => {
  const { isAuthenticated } = useAuthStore();

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
          <li>
            <Link href="/profile" className=" font-bold">
              -profile-
            </Link>
            <span>------</span>
            <Link href="/auth/sign-in" className=" font-bold">
              -sign In-
            </Link>
            {isAuthenticated ? (
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
