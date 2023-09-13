import axios from "axios";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function setSignUp(data) {
  const URL = "auth/signup";

  const response = await axios
    .post(`${ROOT_API}/${API_VERSION}/${URL}`, data)
    .catch((err) => err.response);
  const axiosRes = response.data;

  if (axiosRes?.error === 1) {
    return axiosRes;
  }
  return axiosRes.data;
}
