import axios from "axios";

const getUser = async () => {
  try {
    const serverId = "24309757";
    const startDate = "2023-11-05T12:00:00Z";
    const stopDate = "2023-11-15T12:00:00Z";
    const resolution = "30";
    const url = `${process.env.BM_API_URL}/servers/${serverId}/player-count-history`;

    const response = await axios.get(url, {
      params: {
        start: startDate,
        stop: stopDate,
        resolution: resolution,
      },
    });
    return JSON.stringify(response.data.data[0]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getUser;
