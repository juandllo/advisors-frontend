import { TUser } from '@/types';
import { env } from '@/config/env';
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

type State = {
  token: string,
  user: TUser,
}

type Action = {
  setToken: (token: string) => void,
  setUser: (token: string) => void,
}

export const useAuthStore = create<State & Action>((set) => ({
  token: '',
  user: {
    _id: '',
    name: '',
    lastName: '',
    cellphone: '',
    address: '',
    email: '',
    roles: [],
  },
  setToken: (token: string) => set(() => ({ token: handleSetToken(token) })),
  setUser: (token: string) => set(() => ({ user: handleSetUser(token) })),
}));

const handleSetToken = (token: string) => {
  localStorage.setItem(env.AUTH_TOKEN_KEY, token);
  return token;
}

const handleSetUser = (token: string) => {
  const tokenDecoded = jwtDecode(token);
  const user: TUser = tokenDecoded.sub;

  localStorage.setItem(env.AUTH_USER_DATA, JSON.stringify(user));
  return user;
}
