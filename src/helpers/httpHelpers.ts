import { env } from '@/config/env';

export const postHttp = async (endpoint: string, body: any) => {
  return await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: setHeaders()
  }).then(res => res.json())
}

export const patchHttp = async (endpoint: string, body: any) => {
  return await fetch(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: setHeaders()
  }).then(res => res.json())
}

export const getHttp = async (endpoint: string) => {
  return await fetch(endpoint, {
    method: 'GET',
    headers: setHeaders()
  }).then(res => {
    console.log(`codigo de respuesta del servidor ${res.status}`);
    return res.json();
  });
}

const setHeaders = () => {
  const headers = {
    'Content-type': 'application/json'
  }

  if (!localStorage.getItem(env.AUTH_TOKEN_KEY)) return { ...headers };
  return { ...headers, 'Authorization': `Bearer ${localStorage.getItem(env.AUTH_TOKEN_KEY)}` }
}
