"use client";

import { AuthApiEndpoints } from "@/constants/api-endpoints/auth";
import { fetchClient } from "@/libs/fetch/client";
import { exceptionServerHandler } from "@/utils/exception/server";
import { Button } from "@mui/material";
import Image from "next/image";
import { useCallback } from "react";
import useSWRMutation from "swr/mutation";

export default function Home() {
  const { trigger: triggerLogout, isMutating: loadingLogout } = useSWRMutation(
    AuthApiEndpoints.LOGOUT,
    (key) => fetchClient(key).post(),
    {
      onSuccess: () => {
        window.location.href = "/login";
      },
      onError: (err) => exceptionServerHandler(err),
      throwOnError: false,
    },
  );

  const handleLogout = useCallback(() => triggerLogout(), [triggerLogout]);

  return (
    <div className='bg-gray-700'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <Image
          className='dark:invert'
          src='/next.svg'
          alt='Next.js logo'
          width={180}
          height={38}
          priority
        />

        <Button
          loading={loadingLogout}
          variant='contained'
          color='error'
          onClick={handleLogout}
        >
          Logout
        </Button>
      </main>
    </div>
  );
}
