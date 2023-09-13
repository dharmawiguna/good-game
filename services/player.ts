import axios from "axios";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function getFeaturedGame() {
  const URL = "players/landingpage";
  const res = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosRes = res.data;
  return axiosRes.data;
}

export async function getDetailVoucher(id: string) {
  const URL = `players/${id}/detail`;
  const res = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosRes = res.data;
  return axiosRes.data;
}

export async function GetGameCategory() {
  const URL = "players/category";
  const res = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosRes = res.data;
  return axiosRes.data;
}
