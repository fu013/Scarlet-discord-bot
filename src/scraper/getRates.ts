import axios from "axios";
import cheerio from "cheerio";
import logger from "../config/winston";
import { mapStringify } from "../lib/mapStringify";

const getRates = async (typeIndex: any = 2) => {
  try {
    let myMap = new Map();
    const response = await axios.get(process.env.DODO_DEX_URL + "/rates", {
      headers: {
        "User-Agent": "request",
      },
    });
    let typeString = "official";
    switch (parseInt(typeIndex)) {
      case 0:
        typeString = "New Arkpocalypse";
        break;
      case 1:
        typeString = "New Small Tribes";
        break;
      case 2:
        typeString = "official";
        break;
      case 3:
        typeString = "Small Tribes";
        break;
      case 4:
        typeString = "Arkpocalypse";
        break;
      default:
        typeString = "official";
    }
    const $ = cheerio.load(response.data);
    const crawList = $(".server-rates").eq(typeIndex).find(".biggerNum");
    crawList
      .map((index) => {
        const title = crawList.eq(index).siblings("div").text();
        const value = crawList.eq(index).text();
        myMap.set(title, value);
      })
      .get();
    return "Server Type: " + typeString + "\n" + mapStringify(myMap);
  } catch (error) {
    logger.error("Error occurred:", error);
  }
};

export default getRates;
