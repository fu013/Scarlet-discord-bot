import logger from "../config/winston";
import { bmAxios } from "./setting/axios";

const getServerAll = async () => {
  try {
    const url = "servers";
    const queryParams = {
      include: "serverGroup",
      "page[size]": "10",
      "page[rel]": "next",
      "filter[status]": "online",
      "filter[search]": "solo",
      "filter[game]": "arksa",
      "filter[players][min]": "10",
    };

    const res = await bmAxios.get(url, {
      params: queryParams,
    });

    const serverList = [];
    res.data.data.forEach((item: any) => {
      const message = `서버명: ${item?.attributes?.name}\nid: ${item?.attributes?.id}\nip: ${item?.attributes?.ip}\n플레이어 수: ${item?.attributes?.players}\n생성일: ${item?.attributes?.createdAt}\n`;
      serverList.push(message);
    });

    logger.http("server data length: " + res.data.data.length);
    return serverList.join("\n");
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default getServerAll;
