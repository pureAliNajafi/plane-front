"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { checkAuthStatus } from "@/actions/auth/auth-status";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus().then(setIsAuthenticated);
  }, []);

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
