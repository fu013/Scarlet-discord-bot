import axios from "axios";

export const bmAxios = axios.create({
  baseURL: process.env.BM_API_URL + "/",
});

export const doAxios = axios.create({
  baseURL: process.env.DODO_DEX_URL + "/",
  headers: {
    "User-Agent": "request",
  },
});
