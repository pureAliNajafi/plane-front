import React from "react";
import { getFlyingMachines } from "@/lib/api";
import MachineCard from "@/components/MachineCard";
import Pagination from "@/components/Pagination";
import { FlyingMachineSearchParams } from "@/lib/types";

export default async function Page({ searchParams }: { searchParams: FlyingMachineSearchParams }) {
  const flyingMachines = await getFlyingMachines(searchParams);
  // console.log(flyingMachines.data);
  return (
    <div className="grid grid-cols-12">
      <section className="col-span-3 bg-gray-100 p-5">SideBar</section>
      <section className="col-span-9 p-5">
        <div className="grid grid-cols-3 gap-5">
          {/* <pre>{JSON.stringify(flyingMachines.data, null, 2)}</pre> */}
          {flyingMachines.data.map((machine: any) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>

        <Pagination pagination={flyingMachines.meta.pagination} />
      </section>
    </div>
  );
}
