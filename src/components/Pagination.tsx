"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const Pagination = ({ pagination }: { pagination: any }) => {
  const searchParamas = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter(); // for updating  url

  const handlePrev = () => {
    const params = new URLSearchParams(searchParamas);
    let page = parseInt(params.get("page") ?? "1");
    page > 1 && page--;
    params.set("page", page.toString());
    replace(`${pathName}?${params.toString()}`); // update url with current path
  };
  const handleNext = () => {
    const params = new URLSearchParams(searchParamas);
    let page = parseInt(params.get("page") ?? "1");
    page++;
    params.set("page", page.toString());
    replace(`${pathName}?${params.toString()}`); // update url with current path
  };
  const handlePerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParamas);
    params.set("pageSize", e.target.value);
    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div className="mt-4 flex gap-5">
      <button onClick={handlePrev}>Prev</button>
      <div>
        Page: {pagination.page}/{pagination.pageCount}
      </div>
      <div>
        <label>Per Page</label>
        <select title="itemsPerPage" onChange={handlePerPage}>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Pagination;
