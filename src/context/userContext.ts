import { create } from 'zustand';
import { TUser } from '@/types/TUser';

type State = {
  user: TUser;
}

type Action = {
  updateUser: (user: TUser) => void;
}

export const useUserStore = create<State & Action>((set) => ({
  user: { _id: '', name: '', lastName: '', cellphone: '', address: '' },
  updateUser: (user: TUser) => set(() => ({ user }))
}))