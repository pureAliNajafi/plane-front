import { Machine } from "@/lib/types";
import Image from "next/image";
import React from "react";

const MachineCard = ({ machine }: { machine: Machine }) => {
  //   console.log(machine.Image);
  return (
    <div className="bg-zinc-100 flex flex-col gap-5 items-center py-5">
      <Image
        src={`${process.env.STRAPI_BASE_URL}${machine.Image.formats.thumbnail.url}`}
        alt={machine.Name}
        height={156}
        width={156}
        placeholder="blur"
        blurDataURL="/loading-gif.gif"
      />

      <div>{machine.Name}</div>
      <div className="grid grid-cols-3 gap-5">
        <div>⚔️ {machine.Attack}</div>
        <div>🛡️ {machine.Defence}</div>
        <div>🚀 {machine.Speed}</div>
      </div>
    </div>
  );
};

export default MachineCard;
