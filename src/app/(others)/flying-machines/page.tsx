import React from "react";
import { getFlyingMachines, getWeapons } from "@/lib/api";
import MachineCard from "@/components/MachineCard";
import Pagination from "@/components/Pagination";
import { FlyingMachineSearchParams, Machine } from "@/lib/types";
import ScoreFilter from "@/components/ScoreFilter";
import WeaponsFilter from "@/components/WeaponsFilter";
import { attributes } from "@/config/attributes";
import SortByAttribute from "@/components/SortByAttribute";
import { Search } from "@/components/Search";

export default async function Page({ searchParams }: { searchParams: FlyingMachineSearchParams }) {
  const flyingMachines = await getFlyingMachines(searchParams);
  const weapons = await getWeapons();
  // console.log(flyingMachines.data);
  return (
    <>
      <div className="grid grid-cols-12 relative">
        <input type="checkbox" id="toggle-bg" className="peer hidden" />
        <label
          htmlFor="toggle-bg"
          className="absolute top-3 right-1 cursor-pointer px-1.5 py-1.5 bg-gray-200 md:hidden select-none shadow-md peer-checked:shadow-none"
        >
          ⚙️
        </label>
        <section className="mt-16 md:mt-0 col-span-12 md:col-span-3 bg-gray-100 p-5 hidden peer-checked:flex flex-col gap-5 md:flex md:peer-checked:flex">
          <Search />
          <h2>
            <strong>Attributes</strong>
          </h2>
          {attributes.map((attr) => (
            <ScoreFilter key={attr} attr={attr} />
          ))}
          <WeaponsFilter weapons={weapons.data} />
          <SortByAttribute />
        </section>
        <section className="col-span-12 md:col-span-9 p-5 mt-10 md:mt-0">
          {flyingMachines.data.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {flyingMachines.data.map((machine: Machine) => (
                  <MachineCard key={machine.id} machine={machine} />
                ))}
              </div>
              <Pagination pagination={flyingMachines.meta.pagination} />
            </>
          ) : (
            <div className="text-center py-5">No Data To Display</div>
          )}
        </section>
      </div>
    </>
  );
}
