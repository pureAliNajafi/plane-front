import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-slate-200">
      <div className="flex justify-between m-auto max-w-screen-lg p-5">
        <div>
          <Link href="/">🛫 Planes</Link>
        </div>
        <ul className="flex gap-5">
          <li>
            <Link href="/flying-machines">Flying Machines</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
