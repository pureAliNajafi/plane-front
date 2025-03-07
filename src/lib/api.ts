import { attributes } from "@/config/attributes";
import { FlyingMachineSearchParams, Message } from "./types";
import { http } from "@/core/services/apiClient";
import axios from "axios";

export async function getHeroText() {
  const { data } = await http.get(`/hero-text`);
  return data;
}

export async function getFlyingMachines(searchParams: FlyingMachineSearchParams) {
  const params: Record<string, string> = {
    "populate[Image]": "true",
    "populate[weapons]": "true",
    "pagination[pageSize]": searchParams.pageSize?.toString() || "9",
    "pagination[page]": searchParams.page?.toString() || "1",
  };

  //* search filter
  if (searchParams.search) params["filters[Name][$contains]"] = searchParams.search;

  //* attributes filter
  attributes
    .filter((attr) => attr in searchParams)
    .forEach((attr) => {
      params[`filters[${attr}][$gte]`] =
        searchParams[attr as keyof FlyingMachineSearchParams].toString();
    });

  //* filter weapons
  if (searchParams.weapons)
    searchParams.weapons.split(",").forEach((weapon, index) => {
      params[`filters[$and][${index}][weapons][id][$in]`] = weapon;
    });

  //* sort
  if (searchParams.sort)
    searchParams.sort.split(",").forEach((attr, index) => {
      params[`sort[${index}]`] = attr;
    });

  const { data } = await http.get(`/flying-machines`, {
    params,
  });
  return data;
}

export async function getWeapons() {
  const response = await http.get(`/weapons`);
  return response.data;
}

export async function createContactMessage(data: Message) {
  console.log("logged");

  // const response = await axios.post(`/contact-messages`, { data }, { headers: HEADERS });
  const response = await http.post(`/contact-messages`, { data });

  console.log(response.data);
  return response.data;
}

export async function getFlyingMachineById(id: string) {
  const response = await http.get(`/flying-machines/${id}`, {
    params: { "populate[Image]": "true" },
  });
  return response.data;
}

/* export async function registerUser(userData: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const res = await http.post("/auth/local/register", userData);
    console.log(res);
    return res.data;
  } catch (error: any) {
    console.error("Registration Error:", error.response?.data); // Log the full error response
    return { error: error.response?.data?.error?.message || "Something went wrong" };
  }
} */
export async function registerUser(userData: {
  username: string;
  email: string;
  password: string;
}) {
  return http
    .post("/auth/local/register", userData)
    .then((res) => res.data)
    .catch((error) => ({
      error: error.response?.data?.error?.message || "Invalid credentials",
    }));
}

export async function loginUser(userData: { email: string; password: string }) {
  return http
    .post("/auth/local", { identifier: userData.email, password: userData.password })
    .then((res) => res.data)
    .catch((error) => ({
      error: error.response?.data?.error?.message || "Invalid credentials",
    }));
}
//############## Default js
// const API_URL = process.env.STRAPI_API_URL;

// const HEADERS = {
//   Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
//   "Content-Type": "application/json",
// };

//  export async function getHeroText() {
//   const res = await fetch(API_URL + "/hero-text", { headers: HEADERS });
//   const json = await res.json();
//   return json;
// }

/* export async function getFlyingMachines(searchParams: FlyingMachineSearchParams) {
  const url = new URL(API_URL + "/flying-machines");

  url.searchParams.set("populate[Image]", "true");
  url.searchParams.set("populate[weapons]", "true");

  //* search filter
  searchParams.search && url.searchParams.set("filters[Name][$contains]", searchParams.search);

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
 */

// export async function getWeapons() {
//   const url = new URL(API_URL + "/weapons");

//   const res = await fetch(url, { headers: HEADERS });
//   if (!res.ok) throw new Error(`API request failed: ${res.statusText}`);

//   const json = await res.json();
//   return json;
// }

// export async function createContactMessage(data: Message) {
//   console.log("logged");
//   try {
//     const res = await fetch(`${API_URL}/contact-messages`, {
//       headers: HEADERS,
//       method: "POST",
//       body: JSON.stringify({ data }), // Correct the structure of the body
//     });
//     if (!res.ok) {
//       const json = await res.json();
//       console.error(json);
//       throw new Error(`API request failed: ${res.statusText}`);
//     }
//     const json = await res.json();
//     console.log(json);
//     return json;
//   } catch (error) {
//     console.error("Error: ", error);
//     throw error;
//   }
// }

// export async function getFlyingMachineById(id: string) {
//   const url = new URL(API_URL + `/flying-machines/${id}`);

//   url.searchParams.set("populate[Image]", "true");

//   const res = await fetch(url, { headers: HEADERS });
//   if (!res.ok) throw new Error(`API request failed: ${res.statusText}`);

//   const json = await res.json();
//   return json;
// }
