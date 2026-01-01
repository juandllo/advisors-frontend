import { TProduct, TOrder } from '@/types';
import { create } from 'zustand';

type State =  {
  products: TProduct[],
  order: TOrder,
}

type Action = {
  setProducts: (products: TProduct[]) => void,
  setOrder: (order: TOrder) => void,
}

export const useOrderStore = create<State & Action>((set) => ({
  products: [],
  order: {},
  setProducts: (products: TProduct[]) => set(() => ({ products })),
  setOrder: (order: TOrder) => set(() => ({ order }))
}));