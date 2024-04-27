
const getTocken = () => {
  return localStorage.getItem('token')
}
const getHeaders = async () => {
  const token = getTocken()
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}
const request = async <TResponse>(url: string, config = {}): Promise<TResponse> => {
  const headers = await getHeaders()
  const response = await fetch(url, { ...config, headers })
  return await response.json()
}
export const API_GET = <TResponse>(
  url: string,
  params?: object,
) => {
  if (params) {
    const urlParam = new URLSearchParams(params as URLSearchParams)?.toString()
    return request<TResponse>(
      `${url}?${urlParam}`,
      { method: 'GET' },
    )
  }
  return request<TResponse>(url, { method: 'GET' })
}

export const API_POST = <TResponse>(
  url: string,
  body?: object | unknown,
) => {
  return request<TResponse>(
    url,
    { method: 'POST', body: JSON.stringify(body) },
  )
}
