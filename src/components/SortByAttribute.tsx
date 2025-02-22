"use client";

import { attributes } from "@/config/attributes";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const SortByAttribute = () => {
  const [sortOrder, setSortOrder] = useState(":asc");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedSorts = searchParams.get("sort")?.split(",") || [];
  const selectedSortKeys =
    selectedSorts.length > 0 ? selectedSorts.map((s) => s.split(":")[0]) : [];
  const availableSorts = attributes.filter((attr) => !selectedSortKeys.includes(attr));
  const availableSortKeys = availableSorts.map((s) => s.split(":")[0]);

  //   console.log(selectedSortsKeys, availableSorts);
  const handleAddSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const newAttrToSort = e.target.value + sortOrder;

    const params = new URLSearchParams(searchParams);
    //
    //
    const newSort = [...selectedSorts, newAttrToSort];
    params.set("sort", newSort.join(","));
    // params.set("page", "1");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const handleRemoveSort = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedSorts.length == 1) {
      params.delete("sort");
    } else {
      const newSort = [...selectedSorts].filter((s) => !s.includes(sort));
      params.set("sort", newSort.join(","));
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <section>
      <h2>
        <strong>Sort</strong>
      </h2>

      <div className="flex gap-1 h-[30px] justify-between my-5">
        <select
          title="sorting attributes"
          onChange={handleAddSort}
          value={-1}
          disabled={availableSortKeys.length == 0}
          className="h-full w-2/3 disabled:bg-gray-200"
        >
          <option value={-1}></option>
          {availableSortKeys.map((attr) => (
            <option key={attr} value={attr}>
              {attr}
            </option>
          ))}
        </select>
        <select
          title="sorting order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          disabled={availableSortKeys.length == 0}
          className="h-full disabled:bg-gray-200"
        >
          <option value=":asc">asc</option>
          <option value=":desc">desc</option>
        </select>
      </div>

      <div className="flex gap-1 flex-wrap mt-5">
        {selectedSorts.map((s) => {
          const sortKey = s.split(":")[0];
          const sortValue = s.split(":")[1];
          return (
            <button
              key={s}
              onClick={() => handleRemoveSort(sortKey)}
              className="p-1  text-sm bg-purple-600 text-white rounded-lg shadow-md"
            >
              {sortKey}
              <span className="text-gray-300 text-xs">:{sortValue}</span>
              <span> ❌</span>
            </button>
          );
        })}{" "}
      </div>
    </section>
  );
};

export default SortByAttribute;
