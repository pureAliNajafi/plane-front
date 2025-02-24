"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import LoadingSpinner from "./LoadingSpinner";

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      router.replace(`${path}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          {isPending ? (
            <LoadingSpinner className="w-5 h-5" />
          ) : (
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          )}
        </div>
        <input
          title="search input"
          type="search"
          defaultValue={searchParams.get("search")?.toString()} // to sync with page param
          onChange={(e) => handleSearch(e.target.value)}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Models..."
        />
      </div>
    </div>
  );
}
