import axios from "axios";
import cheerio from "cheerio";
import logger from "../config/winston";
import { mapStringify } from "../lib/mapStringify";

const getRates = async () => {
  try {
    let myMap = new Map();
    const response = await axios.get(process.env.DODO_DEX_URL + "/rates", {
      headers: {
        "User-Agent": "request",
      },
    });
    const $ = cheerio.load(response.data);
    const crawList = $(".server-rates").eq(2).find(".biggerNum");
    crawList
      .map((index) => {
        const title = crawList.eq(index).siblings("div").text();
        const value = crawList.eq(index).text();
        myMap.set(title, value);
      })
      .get();
    return mapStringify(myMap);
  } catch (error) {
    logger.error("Error occurred:", error);
  }
};

export default getRates;
