"use client";
import { Weapon } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const WeaponsFilter = ({ weapons }: { weapons: Weapon[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedWeapons = searchParams.get("weapons")?.split(",") || [];

  const toggleWeapon = (weaponId: number) => {
    const newSelection = selectedWeapons.includes(String(weaponId))
      ? selectedWeapons.filter((id) => id !== String(weaponId)) // Remove if exists
      : [...selectedWeapons, String(weaponId)]; // Add if not exists

    const params = new URLSearchParams(searchParams);
    newSelection.length ? params.set("weapons", newSelection.join(",")) : params.delete("weapons");

    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <h2>
        <strong>Weapons</strong>
      </h2>
      <div className="f">
        {weapons.map((weapon) => (
          <div key={weapon.id} className="flex justify-between my-5">
            <label>{weapon.Name}</label>
            <input
              title={weapon.Name}
              type="checkbox"
              checked={selectedWeapons.includes(String(weapon.id))}
              onChange={() => toggleWeapon(weapon.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeaponsFilter;
