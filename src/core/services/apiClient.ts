import axios from "axios";

const API_URL = process.env.STRAPI_API_URL;

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});
