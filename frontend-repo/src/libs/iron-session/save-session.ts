"use server";

import { getSession } from "./get-session";
import { ApiUser } from "@/types/api/user";

export const saveSession = async (data: ApiUser, token: string) => {
  const session = await getSession();

  session.name = data?.name || "-";
  session.token = token;

  await session.save();
};
