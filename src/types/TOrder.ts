import { TProduct } from "./TProduct";

export type TOrder = {
  _id: string;
  user: string;
  status: string;
  total: number;
  product: TProduct[];
  createdAt: Date;
  messenger: string;
}