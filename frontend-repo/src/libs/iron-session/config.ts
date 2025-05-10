import { SessionOptions } from "iron-session";

import { ENV_CONFIG } from "@/configs/env";

const DAYS_TO_SECONDS = 24 * 60 * 60; // HOURS * MINS * SECS

const maxAge = 1 * DAYS_TO_SECONDS;

export interface SessionData {
  name: string;
  email: string;
  token: string;
}

export const sessionOptions: SessionOptions = {
  password: ENV_CONFIG.sessionPassword,
  cookieName: "s_t",
  cookieOptions: {
    httpOnly: true,
    secure: false,
    maxAge,
  },
};
