import { toast } from "@/components/atoms/sonner";
import { ENV_CONFIG } from "@/configs/env";

import { Fetch } from "./config";

export const fetchClient = <Response>(url?: string, init?: RequestInit) => {
  return new Fetch<Response>(
    url?.startsWith("https://") || url?.startsWith("http://")
      ? ""
      : ENV_CONFIG.baseUrl,
    url?.replace(/\?$/, ""),
    init,
    async (err) => {
      if (
        err.message === "Invalid token" ||
        err.message === "jwt expired" ||
        err.message === "Session expired, please login again"
      ) {
        window.location.reload();

        if (err.message === "jwt expired") {
          toast.error({ description: "Session expired, please login again" });
          err.message = "Session expired, please login again";
          return;
        }
      }
    },
  );
};
