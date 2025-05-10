import type { PropsWithChildren } from 'react';

import { redirect } from 'next/navigation';

import { getSession } from '@/libs/iron-session/get-session';

export default async function PrivateRouteLayout({
  children,
}: PropsWithChildren) {
  const session = await getSession();

  if (!session.token) redirect('/login');

  return <>{children}</>;
}
