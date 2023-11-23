import logger from "../config/winston";
import { bmAxios } from "./setting/axios";
import { myPool } from "../config/database";

/**
 * 비공식/공식 서버 ID/NAME 수집
 * 2023-11-23 기준 총 59,363개
 */
let updateDataNums = 0;
let updateDataNums_no = 0;
let timeout;
let timeoutFlag = true;
const size = 100;

const setServerArkPVP = async (
  url: string = "servers",
  isNext: boolean = false
) => {
  if (!isNext) clearTimeout(timeout);
  try {
    const queryParams = {
      "page[size]": size,
      "filter[game]": "arksa",
      "page[rel]": "next",
      "filter[status]": "online",
    };
    const res = isNext
      ? await bmAxios.get(url)
      : await bmAxios.get(url, {
          params: queryParams,
        });
    res.data.data.forEach((item: any) => {
      if (item?.attributes?.details?.pve === false) {
        if (item?.attributes?.details?.official === true) {
          myPool.query(
            `
          INSERT INTO server_official (id, name)
          VALUES (?, ?)
          ON DUPLICATE KEY UPDATE name = VALUES(name)
          `,
            [item?.attributes?.id, item?.attributes?.name],
            (err, results, fields) => {
              if (err) {
                logger.error("Error executing insert/update query:", err);
                return;
              }
            }
          );
          updateDataNums++;
        }
        if (item?.attributes?.details?.official === false) {
          myPool.query(
            `
          INSERT INTO server_non_official (id, name)
          VALUES (?, ?)
          ON DUPLICATE KEY UPDATE name = VALUES(name)
          `,
            [item?.attributes?.id, item?.attributes?.name],
            (err, results, fields) => {
              if (err) {
                logger.error("Error executing insert/update query:", err);
                return;
              }
            }
          );
          updateDataNums_no++;
        }
      }
    });
    if (res.data.links?.next && timeoutFlag) {
      timeoutFlag = false;
      timeout = setTimeout(() => {
        timeoutFlag = true;
        setServerArkPVP(res.data.links.next, true);
      }, 2000);
    }
    logger.info(res.data.data[0]);
    if (res.data.links?.next === undefined) {
      const message = `DataCollection End!\n${updateDataNums} Official Server Info Database Saved\n${updateDataNums_no}Non-Official Server Info Database Saved`;
      logger.info(message);
      clearTimeout(timeout);
      return;
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default setServerArkPVP;
