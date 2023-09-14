import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function GetMemberOverview() {
  const url = `${ROOT_API}/${API_VERSION}/players/dashboard`;
  return callAPI({ url, method: "GET", token: true });
}

export async function getMemberTransaction(paramsValue: string) {
  let params = "";
  if (paramsValue === "all") {
    params = "";
  } else {
    params = `?status=${paramsValue}`;
  }
  const url = `${ROOT_API}/${API_VERSION}/players/history${params}`;
  return callAPI({ url, method: "GET", token: true });
}
