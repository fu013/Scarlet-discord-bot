import logger from "../config/winston";
import { bmAxios } from "./setting/axios";
import { myPool } from "../config/database";

let updateDataNums = 0;
let timeout;
let timeoutFlag = true;
const size = 100;
const setServerOfficial = async (
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
      if (
        item?.attributes?.details?.official &&
        item?.attributes?.details?.official === true
      ) {
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
            logger.debug(
              "Inserted successfully. Affected rows:" + results.affectedRows
            );
          }
        );
        updateDataNums++;
      }
    });
    if (res.data.links?.next && timeoutFlag) {
      timeoutFlag = false;
      timeout = setTimeout(() => {
        timeoutFlag = true;
        setServerOfficial(res.data.links.next, true);
      }, 5000);
    }
    console.log(res.data.data[0]);
    console.log(res.data.links?.next);
    if (
      res.data.links?.next === false ||
      res.data.links?.next === null ||
      res.data.links?.next === undefined ||
      res.data.data[0] === false ||
      res.data.data[0] === null ||
      res.data.data[0] === undefined
    ) {
      const message_o =
        updateDataNums + " Official Server Info Database Saved\n";
      const message_no =
        updateDataNums + " Non-Official Server Info Database Saved";
      logger.info(message_o + message_no);
      clearTimeout(timeout);
      return;
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default setServerOfficial;
