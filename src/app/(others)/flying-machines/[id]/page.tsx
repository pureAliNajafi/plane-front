import MachineCard from "@/components/MachineCard";
import MachineLike from "@/components/MachineLike";
import RadarChart from "@/components/RadarChart";
import { getFlyingMachineById, getFlyingMachineLikeStatusById } from "@/lib/api";
import Image from "next/image";
import React, { Suspense } from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const machine = await getFlyingMachineById(id); //documentId
  const likeStatus = await getFlyingMachineLikeStatusById(String(machine.data.id));
  console.log(machine, likeStatus);
  return (
    <div>
      <div className="flex justify-between mt-5">
        <h2 className="text-2xl">
          <strong>{machine.data.Name}</strong>
        </h2>
        <MachineLike likeStatus={likeStatus} />
      </div>

      <div className="grid md:grid-cols-2 gap-5 p-5  ">
        <div>
          <Image
            src={`${process.env.STRAPI_BASE_URL}${machine.data.Image.formats.small.url}`} // X machine.Image X
            alt={machine.Name}
            height={500}
            width={500}
            placeholder="blur"
            blurDataURL="/loading-gif.gif"
            className="w-full"
          />
        </div>
        <div>
          <RadarChart attrs={machine.data} />
        </div>
      </div>
      <p className="text-gray-600"> {machine.data.Description}</p>
    </div>
  );
};

export default Page;
