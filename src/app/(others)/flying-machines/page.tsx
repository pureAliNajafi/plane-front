import React from "react";
import { getFlyingMachines } from "@/lib/api";
import MachineCard from "@/components/MachineCard";
import Pagination from "@/components/Pagination";
import { FlyingMachineSearchParams, Machine } from "@/lib/types";
import ScoreFilter from "@/components/ScoreFilter";

export default async function Page({ searchParams }: { searchParams: FlyingMachineSearchParams }) {
  const flyingMachines = await getFlyingMachines(searchParams);
  // console.log(flyingMachines.data);
  return (
    <div className="grid grid-cols-12">
      <section className="col-span-3 bg-gray-100 p-5">
        <label>Attributes</label>
        {["Attack", "Defense", "Speed", "Agility", "Capacity"].map((attr) => (
          <ScoreFilter key={attr} attr={attr} />
        ))}
      </section>
      <section className="col-span-9 p-5">
        <div className="grid grid-cols-3 gap-5">
          {/* <pre>{JSON.stringify(flyingMachines.data, null, 2)}</pre> */}
          {flyingMachines.data.map((machine: Machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>

        <Pagination pagination={flyingMachines.meta.pagination} />
      </section>
    </div>
  );
}
