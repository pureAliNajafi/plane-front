import { FlyingMachineSearchParams } from "./types";

const API_URL = process.env.STRAPI_API_URL;

const HEADERS = {
  Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  "Content-Type": "application/json",
};

export async function getHeroText() {
  const res = await fetch(API_URL + "/hero-text", { headers: HEADERS });
  const json = await res.json();
  return json;
}

export async function getFlyingMachines(searchParams: FlyingMachineSearchParams) {
  const url = new URL(API_URL + "/flying-machines");

  url.searchParams.set("populate[Image]", "true");
  url.searchParams.set("populate[weapons]", "true");

  //* attributes filter
  const attributes = ["Attack", "Defence", "Speed", "Agility", "Capacity"];
  const filteredAttributes = attributes.filter((attr) => attr in searchParams);

  filteredAttributes.forEach((attr) => {
    url.searchParams.set(
      `filters[${attr}][$gte]`,
      searchParams[attr as keyof FlyingMachineSearchParams].toString()
    );
  });

  //* pagination
  url.searchParams.set("pagination[pageSize]", searchParams.pageSize?.toString() || "9");
  // Reset page to 1 if any attribute filter is applied
  if (filteredAttributes.length > 0) url.searchParams.set("pagination[page]", "1");
  else if (searchParams.page)
    url.searchParams.set("pagination[page]", searchParams.page.toString());

  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`API request failed: ${res.statusText}`);

  const json = await res.json();
  return json;
}

/*  export async function getFlyingMachines(searchParams: FlyingMachineSearchParams) {
  const url = new URL(API_URL + "/flying-machines?populate=Image");

  url.searchParams.set("pagination[pageSize]", "9"); // default render 9 items only if there is no pageSize in params
  for (let key in searchParams) {
    key === "page" && url.searchParams.set("pagination[page]", searchParams["page"].toString());
    key === "pageSize" &&
      url.searchParams.set("pagination[pageSize]", searchParams["pageSize"].toString());
  }
  const res = await fetch(url, { headers: HEADERS });
  const json = await res.json();
  return json;
}  */

/* export async function getFlyingMachines() {
  const res = await fetch(API_URL + "/flying-machines?populate=Image", { headers: HEADERS });
  const json = await res.json();
  return json;
}
 */
