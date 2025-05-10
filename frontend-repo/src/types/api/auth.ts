import { CommonResponse } from "../common/response";
import { ApiUser } from "./user";

export interface AuthLoginBody {
  email: string;
  password: string;
}

export type AuthLoginResponse = {
  user: ApiUser;
  token: string;
} & CommonResponse;
