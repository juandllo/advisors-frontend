import { env } from './env';

export const endpoints = {
  users: `${env.api}/users`,
  orders: `${env.api}/orders`
}