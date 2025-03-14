import { Machine, WeaponType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MachineCard = ({ machine }: { machine: Machine }) => {
  // console.log(machine.Image);
  return (
    <div className="bg-zinc-100 flex flex-col gap-5 items-center py-5">
      {/* @ts-ignore */}
      <Link href={`/flying-machines/${machine.documentId}`}>
        <Image
          src={`${process.env.STRAPI_BASE_URL}${machine.Image.formats.thumbnail.url}`}
          alt={machine.Name}
          height={156}
          width={156}
          placeholder="blur"
          blurDataURL="/loading-gif.gif"
        />
      </Link>

      <div>{machine.Name}</div>
      <div className="grid grid-cols-3 gap-5">
        <div>⚔️ {machine.Attack}</div>
        <div>🛡️ {machine.Defence}</div>
        <div>🚀 {machine.Speed}</div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>⚡ {machine.Agility}</div>
        <div>📦 {machine.Capacity}</div>
      </div>
      <div className="md:w-full flex gap-5 md:gap-0 md:justify-evenly">
        {machine.weapons.map((weapon) => (
          <div key={weapon.id} className="bg-green-200 rounded-lg py-1 px-2 text-sm font-bold">
            {weapon.Name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachineCard;
