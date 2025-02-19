"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const ScoreFilter = ({ attr }: { attr: string }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const selectedScore = searchParams.get(attr);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (!value) return;
    if (value === "-1") {
      params.delete(attr);
      replace(`${pathName}?${params.toString()}`);
      return;
    }

    params.set(attr, value);
    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div className="flex justify-between">
      <label>{attr}</label>
      <select
        title="filterAttrValue"
        onChange={handleChange}
        value={selectedScore ? parseInt(selectedScore) : undefined}
      >
        <option value={-1}></option>
        {[5, 4, 3, 2, 1].map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ScoreFilter;
