import { redirect } from 'react-router-dom';
import { env } from '@/config/env';
import { alertWarning } from './alertHandler';

export const postHttp = async (endpoint: string, body: any) => {
  return await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: setHeaders()
  }).then(res => {
    validateSession(res.status);
    return res.json();
  })
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
    validateSession(res.status);
    return res.json();
  });
}

const validateSession = (status: number) => {
  // TODO adicionar la redireccion al login en el momento en que se detecte que el token ya no es valido
  // TODO validar si para hacer la redireccion se debe afectar el componente de la alerte
  if (status === 401) {
    alertWarning('La sesión ha caducado, por favor inicia sesión de nuevo.');
    redirect('/inicio-sesion');
    return;
  }
  return;
}

const setHeaders = () => {
  const headers = {
    'Content-type': 'application/json'
  }

  if (!localStorage.getItem(env.AUTH_TOKEN_KEY)) return { ...headers };
  return { ...headers, 'Authorization': `Bearer ${localStorage.getItem(env.AUTH_TOKEN_KEY)}` }
}
