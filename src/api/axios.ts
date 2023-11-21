import axios from "axios";

const bmAxios = axios.create({
  baseURL: process.env.BM_API_URL + "/",
});

export default bmAxios;
