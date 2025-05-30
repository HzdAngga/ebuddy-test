import { NextResponse } from "next/server";

import { fetchServer } from "@/libs/fetch/server";
import { getAuthorization } from "@/libs/fetch/utils";
import { exceptionServerHandler } from "@/utils/exception/server";
import { GetAllUsersReponse } from "@/types/api/user";

export async function GET() {
  const headers = await getAuthorization();
  try {
    const response = await fetchServer<GetAllUsersReponse>(
      "/users/fetch-user-data",
      {
        headers,
      },
    ).get();

    return NextResponse.json({ data: response });
  } catch (err) {
    return exceptionServerHandler(err);
  }
}
