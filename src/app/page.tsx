import Header from "@/components/Navbar";
import Image from "next/image";
import { getHeroText } from "../lib/api";

export default async function Home() {
  const heroText = await getHeroText();
  console.log(heroText);
  return (
    <div>
      <main>
        <section className="h-[calc(100svh-64px)] bg-[url(/hero.png)] bg-cover bg-center bg-no-repeat /sepia-[.6] p-5 flex items-end justify-end">
          <div className="bg-black/50 text-white p-5 backdrop-brightness-50  text-3xl max-w-[340px]">
            <h1>{heroText.data.Title}</h1>
            <p>{heroText.data.Content}</p>
          </div>
        </section>
        <section className="grid md:grid-cols-3 gap-5 p-5 max-w-screen m-auto">
          <div className="bg-slate-100 p-5 flex flex-col gap-5">
            <h2>features</h2>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas cupiditate non nemo,
              soluta aliquid sit? Totam consequuntur aliquid optio quibusdam placeat sapiente
              explicabo voluptate quos possimus, ullam ea obcaecati aspernatur?
            </div>
          </div>
          <div className="bg-slate-100 p-5 flex flex-col gap-5">
            <h2>features</h2>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas cupiditate non nemo,
              soluta aliquid sit? Totam consequuntur aliquid optio quibusdam placeat sapiente
              explicabo voluptate quos possimus, ullam ea obcaecati aspernatur?
            </div>
          </div>
          <div className="bg-slate-100 p-5 flex flex-col gap-5">
            <h2>features</h2>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas cupiditate non nemo,
              soluta aliquid sit? Totam consequuntur aliquid optio quibusdam placeat sapiente
              explicabo voluptate quos possimus, ullam ea obcaecati aspernatur?
            </div>
          </div>
        </section>
        <div className="text-center py-3">{new Date().getFullYear()}</div>
      </main>
    </div>
  );
}
