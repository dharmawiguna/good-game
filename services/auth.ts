import axios from "axios";
import { LoginTypes } from "./data-types";
import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function setSignUp(data: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/auth/signup`;
  return callAPI({ url, method: "POST", data });
}

export async function setSignIn(data: LoginTypes) {
  const url = `${ROOT_API}/${API_VERSION}/auth/signin`;
  return callAPI({ url, method: "POST", data });
}
