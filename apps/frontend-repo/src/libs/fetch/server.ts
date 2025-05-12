import { cookies } from "next/headers";

import { ENV_CONFIG } from "@/configs/env";

import { Fetch } from "./config";

export const fetchServer = <Response>(url?: string, init?: RequestInit) => {
  return new Fetch<Response>(
    ENV_CONFIG.baseUrl,
    url?.replace(/\?$/, ""),
    init,
    async (err) => {
      if (
        err.message === "Invalid token" ||
        err.message === "jwt expired" ||
        err.message === "Session expired, please login again"
      ) {
        const cookiesData = await cookies();
        cookiesData.delete("s_t");
      }
    },
  );
};
