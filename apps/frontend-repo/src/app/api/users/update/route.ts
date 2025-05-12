import { NextResponse } from "next/server";

import { fetchServer } from "@/libs/fetch/server";
import { getAuthorization } from "@/libs/fetch/utils";
import { exceptionServerHandler } from "@/utils/exception/server";
import { GetAllUsersReponse } from "@/types/api/user";

export async function PUT(req: Request) {
  const headers = await getAuthorization();
  const body = await req.formData();
  try {
    const jsonBody = {
      id: body.get("id"),
      name: body.get("name"),
      totalAverageWeightRatings: body.get("totalAverageWeightRatings"),
      numberOfRents: body.get("numberOfRents"),
      rankingScore: body.get("rankingScore"),
    };

    const response = await fetchServer<GetAllUsersReponse>(
      "/users/update-user-data",
      {
        headers,
      },
    ).put(jsonBody);

    return NextResponse.json({ data: response });
  } catch (err) {
    return exceptionServerHandler(err);
  }
}
