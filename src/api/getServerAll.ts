import logger from "../config/winston";
import bmAxios from "./axios";

const getServerAll = async () => {
  try {
    const url = `servers`;
    const queryParams = {
      include: "serverGroup",
      "filter[status]": "online",
      "filter[search]": "solo",
      "filter[game]": "ark",
    };
    const res = await bmAxios.get(url, {
      params: queryParams,
    });
    const serverList = [];
    res.data.data.forEach((item: any) => {
      const ip = item?.attributes?.ip;
      const name = item?.attributes?.name;
      const players = item?.attributes?.players;
      const message = name + " : " + ip + " : " + players;
      serverList.push(message);
    });
    logger.http("server data length: " + res.data.data.length);
    return serverList.join("\n");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getServerAll;
