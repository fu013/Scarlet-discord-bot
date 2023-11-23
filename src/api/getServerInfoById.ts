import logger from "../config/winston";
import { bmAxios } from "./setting/axios";
import { myPool } from "../config/database";

/**
 * ID로 서버 정보 검색
 */
const getServerInfoById = async (serverID: string) => {
  try {
    const [rows, fields] = await myPool
      .promise()
      .query(`SELECT * FROM server_official WHERE name LIKE ?`, [
        `%${serverID}%`,
      ]);
    if (rows.length > 0) {
      serverID = rows[0].id;
    }

    const queryParams = {
      start: "2023-11-21T12:00:00Z",
      stop: "2023-11-23T12:00:00Z",
      at: "2023-11-22T12:00:00Z",
      include: "player",
    };

    const res = await bmAxios.get(
      `https://api.battlemetrics.com/servers/23585585/relationships/sessions?start=2023-11-21T12:00:00Z&stop=2023-11-23T12:00:00Z&at=2023-11-22T12:00:00Z&include=player`
    );
    console.log(res);
    return JSON.stringify(res.data.data, null, 2);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default getServerInfoById;
