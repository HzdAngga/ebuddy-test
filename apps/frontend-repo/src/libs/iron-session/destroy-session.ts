import { getSession } from './get-session';

export const destroySession = async () => {
  const session = await getSession();

  session.destroy();
};
