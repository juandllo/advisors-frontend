import { TProduct } from "./TProduct";

export type TOrder = {
  _id?: string;
  user?: string;
  status?: string;
  total?: number;
  product?: TProduct[];
  createdAt?: Date;
  messenger?: string;
  name?: string;
  lastName?: string;
  paymentMethod?: string;
  deliveryValue?: string;
  address?: string;
  additionalInformation?: string;
}