"use server";

import { getIronSession } from "iron-session";

import { type SessionData, sessionOptions } from "./config";
import { cookies } from "next/headers";

export const getSession = async () => {
  const cookiesData = await cookies();
  const session = await getIronSession<SessionData>(
    cookiesData,
    sessionOptions,
  );
  return session;
};
