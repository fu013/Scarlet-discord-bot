import axios from "axios";

export const bmAxios = axios.create({
  baseURL: process.env.BM_API_URL + "/",
  headers: {
    Authorization: process.env.BM_API_TOKEN,
  },
});
export const doAxios = axios.create({
  baseURL: process.env.DODO_DEX_URL + "/",
  headers: {
    "User-Agent": "request",
  },
});
export const ntAxios = axios.create({
  baseURL: process.env.NITRADO_API_URL + "/",
  headers: {
    Authorization: process.env.NITRADO_API_TOKEN,
  },
});
