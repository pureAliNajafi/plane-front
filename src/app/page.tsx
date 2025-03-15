import Image from "next/image";
import { getHeroText } from "../lib/api";
import HeroImage from "/public/hero.png";
import Features from "@/components/Features";

export default async function Home() {
  const heroText = await getHeroText();
  // console.log(heroText);
  return (
    <div>
      <main>
        <section className="relative h-[calc(100svh-64px)] /bg-[url(/hero.png)] /bg-cover /bg-center /bg-no-repeat /sepia-[.6] p-5 flex items-end justify-end">
          <Image
            src={HeroImage}
            alt="Hero Background"
            fill // Replaces layout="fill" //parent must has position
            className="object-cover sepia-[.6]" // Uses Tailwind for object-fit
            quality={80} // Optimized quality
            priority // Loads image early
            sizes="(max-width:800px) 100vw, 50vw"
            loading="eager"
          />
          <div className="bg-black/50 text-white p-5 backdrop-brightness-50  text-3xl max-w-[340px]">
            <h1>{heroText.data.Title}</h1>
            <p>{heroText.data.Content}</p>
          </div>
        </section>
        <Features />

        <div className="text-center py-3">{new Date().getFullYear()}</div>
      </main>
    </div>
  );
}
