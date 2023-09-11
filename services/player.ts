import axios from "axios";

export async function getFeaturedGame() {
  const ROOT_API = process.env.NEXT_PUBLIC_API;
  const API_VERSION = "api/v1";
  const URL = "players/landingpage";
  const res = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosRes = res.data;
  return axiosRes.data;
}

export async function getDetailVoucher() {
  return null;
}
