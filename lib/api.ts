const API_URL = process.env.STRAPI_API_URL;

const HEADERS = {
  Authorization: "Bearer" + " " + process.env.STRAPI_API_TOKEN,
  "Content-Type": "application/json",
};

export async function getHeroText() {
  const res = await fetch(API_URL + "/hero-text", { headers: HEADERS });
  const json = await res.json();
  return json;
}

export async function getFlyingMachines() {
  const res = await fetch(API_URL + "/flying-machines?populate=Image", { headers: HEADERS });
  const json = await res.json();
  return json;
}
