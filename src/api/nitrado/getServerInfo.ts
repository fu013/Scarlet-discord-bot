import logger from "../../config/winston";
import { ntAxios } from "../setting/axios";
import { myPool } from "../../config/database";

/**
 * ID로 서버 정보 검색
 */
const getServerInfoById_nt = async (serverID: string) => {
  try {
    const res = await ntAxios.get(`services/${serverID}`);
    console.log(res);
    return JSON.stringify(res.data.data, null, 2);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default getServerInfoById_nt;
