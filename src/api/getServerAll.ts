import logger from "../config/winston";
import { bmAxios } from "./setting/axios";
import { myPool } from "../config/database";

const getServerAll = async () => {
  try {
    const url = "servers";
    const queryParams = {
      include: "serverGroup",
      "page[size]": "100",
      "page[rel]": "next",
      "filter[status]": "online",
      "filter[game]": "arksa",
      "filter[players][min]": "0",
    };
    const res = await bmAxios.get(url, {
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
      }
    });
    const message = res.data.data.length + " Server Info Database Saved";
    return message;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default getServerAll;
