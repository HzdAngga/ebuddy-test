import { NextResponse } from 'next/server';

import { destroySession } from '@/libs/iron-session/destroy-session';


export async function POST() {
  await destroySession();

  return NextResponse.json({ message: 'Logged out successfully.' });
}
