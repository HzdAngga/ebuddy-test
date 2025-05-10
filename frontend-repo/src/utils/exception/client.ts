import { toast } from "@/components/atoms/sonner";
import { FetchError } from "@/types/exception/client";

export const exceptionClientHandler = (
  error: unknown,
  cb?: (error: FetchError) => void,
) => {
  if (error instanceof FetchError) {
    if (cb) return cb(error);

    return toast.error({
      description: error.message || "Internal server error",
    });
  }
  return toast.error({ description: "Unknown server error" });
};
