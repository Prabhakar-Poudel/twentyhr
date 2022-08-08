const url =
  process.env.NODE_ENV !== 'production'
    ? `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`
    : `${process.env.REACT_APP_API_HOST}`
const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
const socketProtocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws'
export const rootUrl = `${protocol}://${url}`
export const wsUrl = `${socketProtocol}://${url}/cable`
