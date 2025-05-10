import { FetchError } from "@/types/exception/client";
import { NextResponse } from "next/server";

export const exceptionServerHandler = (
  err: unknown,
  cb?: (err: FetchError) => void,
) => {
  if (err instanceof FetchError) {
    const callback = cb?.(err);
    if (callback) return callback;

    return NextResponse.json(err, { status: err?.status });
  }

  return NextResponse.json(
    { message: "Unknown error occured" },
    { status: 500 },
  );
};
