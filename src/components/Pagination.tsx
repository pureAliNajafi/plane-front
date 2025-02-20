"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect } from "react";

const Pagination = ({ pagination }: { pagination: any }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter(); // for updating  url

  const handlePrev = () => {
    const params = new URLSearchParams(searchParams);
    let page = parseInt(params.get("page") ?? "1");
    page > 1 && page--;
    params.set("page", page.toString());
    replace(`${pathName}?${params.toString()}`); // update url with current path
  };
  const handleNext = () => {
    const params = new URLSearchParams(searchParams);
    let page = parseInt(params.get("page") ?? "1");
    page++;
    params.set("page", page.toString());
    replace(`${pathName}?${params.toString()}`); // update url with current path
  };
  const handlePerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", e.target.value);
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="mt-4 flex gap-5">
      <button
        onClick={handlePrev}
        disabled={pagination.page === 1}
        className="disabled:text-gray-400 text-blue-600"
      >
        Prev
      </button>
      <div>
        Page: {pagination.page}/{pagination.pageCount}
      </div>
      <div>
        <label>Per Page</label>
        <select
          title="itemsPerPage"
          onChange={handlePerPage}
          value={searchParams.get("pageSize") || "9"}
        >
          {["9", "12"].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleNext}
        disabled={pagination.page >= pagination.pageCount}
        className="disabled:text-gray-400 text-blue-600"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
