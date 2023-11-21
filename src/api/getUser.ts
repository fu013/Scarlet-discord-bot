import bmAxios from "./axios";

const getUser = async () => {
  /* try {
    const url = `servers/${serverId}/player-count-history`;
    const queryParams = {
      start: "2023-11-05T12:00:00Z",
      stop: "2023-11-15T12:00:00Z",
      resolution: "30",
    };
    const res = await bmAxios.get(url, {
      params: queryParams,
    });
    return JSON.stringify(res.data.data[0]);
  } catch (error) {
    console.log(error);
    throw error;
  } */
  try {
    const url = `servers`;
    const queryParams = {
      include: "serverGroup",
      "filter[search]": "PVP",
      "filter[status]": "online",
      "filter[game]": "ark",
    };
    const res = await bmAxios.get(url, {
      params: queryParams,
    });
    const ip = res.data.data[0]?.attributes?.ip;
    const players = res.data.data[0]?.attributes?.players;
    const message = ip + " / " + players;
    return message;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getUser;
