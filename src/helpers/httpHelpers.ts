const headers: any = {
  'Content-type': 'application/json'
}

export const postHttp = async (endpoint: string, body: any) => {
  return await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers
  }).then(res => res.json())
}

export const patchHttp = async (endpoint: string, body: any) => {
  return await fetch(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers
  }).then(res => res.json())
}

export const getHttp = async (endpoint: string) => {
  return await fetch(endpoint, {
      method: 'GET',
      headers
  }).then(res => res.json())
}