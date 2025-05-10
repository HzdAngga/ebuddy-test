import { CommonResponse } from "../common/response";

export interface AuthLoginBody {
  email: string;
  password: string;
}

export type AuthLoginResponse = {
  access_token: string;
} & CommonResponse;
