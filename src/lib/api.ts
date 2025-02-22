import { attributes } from "@/config/attributes";
import { FlyingMachineSearchParams, Message } from "./types";

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
  const filteredAttributes = attributes.filter((attr) => attr in searchParams);

  filteredAttributes.forEach((attr) => {
    url.searchParams.set(
      `filters[${attr}][$gte]`,
      searchParams[attr as keyof FlyingMachineSearchParams].toString()
    );
  });

  //* pagination
  url.searchParams.set("pagination[pageSize]", searchParams.pageSize?.toString() || "9");
  searchParams.page && url.searchParams.set("pagination[page]", searchParams.page.toString());

  //* filter weapons
  const selectedWeapons = searchParams.weapons?.split(",") || [];
  selectedWeapons &&
    selectedWeapons.forEach(
      (selectedWeapon, index) =>
        url.searchParams.set(`filters[$and][${index}][weapons][id][$in]`, selectedWeapon)
      // url.searchParams.set(`filters[$and][${index}][weapon][id][$in]`, selectedWeapon)
    );

  //* sort
  if (searchParams.sort) {
    const selectedSorts = searchParams.sort?.split(",") || [];
    selectedSorts.forEach((attr, index) => url.searchParams.set(`sort[${index}]`, attr));
  }

  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`API request failed: ${res.statusText}`);

  const json = await res.json();
  return json;
}

export async function getWeapons() {
  const url = new URL(API_URL + "/weapons");

  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`API request failed: ${res.statusText}`);

  const json = await res.json();
  return json;
}

export async function createContactMessage(data: Message) {
  console.log("logged");
  try {
    const res = await fetch(`${API_URL}/contact-messages`, {
      headers: HEADERS,
      method: "POST",
      body: JSON.stringify({ data }), // Correct the structure of the body
    });
    if (!res.ok) {
      const json = await res.json();
      console.error(json);
      throw new Error(`API request failed: ${res.statusText}`);
    }
    const json = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
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
