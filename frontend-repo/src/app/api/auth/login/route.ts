import { NextResponse } from "next/server";

import { fetchServer } from "@/libs/fetch/server";
import { saveSession } from "@/libs/iron-session/save-session";
import { passwordDecrypt } from "@/utils/encryption/password";
import { exceptionServerHandler } from "@/utils/exception/server";
import { AuthLoginResponse } from "@/types/api/auth";

export async function POST(req: Request) {
  console.log("masuk");
  const body = await req.formData();
  const password: string = body.get("password") as string;

  // * Decrypting password from client-side
  if (password) body.set("password", passwordDecrypt(password));
  try {
    const response = await fetchServer<AuthLoginResponse>("/auth/login").post(
      body,
    );

    await saveSession(response.user, response.token);

    return NextResponse.json({
      message: "Logged in successfully.",
    });
  } catch (err) {
    console.log({ errFetchCilent: err });
    return exceptionServerHandler(err);
  }
}
