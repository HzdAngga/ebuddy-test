import { getSession } from '../iron-session/get-session';

export const getAuthorization = async () => {
  const session = await getSession();
  const accessToken = session?.token || null;

  if (!accessToken) return;

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};
