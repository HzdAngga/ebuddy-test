import type { PropsWithChildren } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Ebuddy-Test",
  description: "Enter your credentials to access Ebuddy-Test dashboard",
};

export default function LoginLayout({ children }: PropsWithChildren) {
  return children;
}
