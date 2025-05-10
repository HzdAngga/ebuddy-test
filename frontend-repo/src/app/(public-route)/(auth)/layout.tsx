import type { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { AuthTemplate } from "@/components/templates/auth";
import { getSession } from "@/libs/iron-session/get-session";

export default async function PublicRouteLayout({
  children,
}: PropsWithChildren) {
  const session = await getSession();

  if (session.token) redirect("/");

  return <AuthTemplate>{children}</AuthTemplate>;
}
