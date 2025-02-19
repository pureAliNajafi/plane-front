import React from "react";
import { getFlyingMachines } from "@/../lib/api";
import MachineCard from "@/components/MachineCard";

export default async function Page() {
  const flyingMachines = await getFlyingMachines();
  console.log(flyingMachines.data);
  return (
    <div className="grid grid-cols-12">
      <section className="col-span-3 bg-gray-100 p-5">SideBar</section>
      <section className="col-span-9 p-5 grid grid-cols-3 gap-5">
        {/* <pre>{JSON.stringify(flyingMachines.data, null, 2)}</pre> */}
        {flyingMachines.data.map((machine: any) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </section>
    </div>
  );
}
