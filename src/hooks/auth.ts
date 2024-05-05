import { env } from '@/config/env';

export const useAuth = () => {
  const isLogged = () => {
    if (localStorage.getItem(env.AUTH_TOKEN_KEY)) return true;
    return false;
  }

  return { isLogged }
}
