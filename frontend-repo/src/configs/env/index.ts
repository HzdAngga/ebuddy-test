import type { AppEnvType } from "@/types/common/env";

type EnvConfigType = {
  appEnv: AppEnvType; // For server-side
  publicAppEnv: AppEnvType; // For client-side
  baseUrl: string;
  sessionPassword: string;
};

export const ENV_CONFIG = {
  appEnv: process.env.APP_ENV ?? "LOCAL",
  publicAppEnv: process.env.NEXT_PUBLIC_APP_ENV ?? "LOCAL",
  baseUrl: process.env.BASE_URL ?? "",
  sessionPassword: process.env.SESSION_PASSWORD ?? "",
} as EnvConfigType;
