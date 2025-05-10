"use server";

import { getSession } from "./get-session";

export const saveSession = async (token: string) => {
  const session = await getSession();

  session.token = token;

  await session.save();
};
