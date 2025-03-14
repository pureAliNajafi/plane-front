import MachineCard from "@/components/MachineCard";
import Pagination from "@/components/Pagination";
import { getUserLikedFlyingMachines } from "@/lib/api";
import { FlyingMachineSearchParams, Machine } from "@/lib/types";
import React from "react";

const Page = async ({ searchParams }: { searchParams: FlyingMachineSearchParams }) => {
  const likedFlyingMachines = await getUserLikedFlyingMachines(searchParams);

  return (
    <div className="w-full py-3">
      <h2 className="text-3xl py-3">Liked History 👍📅</h2>
      <div className="col-span-12">
        {likedFlyingMachines.data.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {likedFlyingMachines.data.map((liked: { id: number; flying_machine: Machine }) => (
                <MachineCard key={liked.id} machine={liked.flying_machine} />
              ))}
            </div>
            <Pagination pagination={likedFlyingMachines.meta.pagination} />
          </>
        ) : (
          <div className="text-center py-5">No Data To Display</div>
        )}
      </div>
    </div>
  );
};

export default Page;
