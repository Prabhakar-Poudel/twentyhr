const url =
  process.env.NODE_ENV !== 'production'
    ? `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`
    : `${process.env.REACT_APP_API_HOST}`
export const rootUrl = `http://${url}`
export const wsUrl = `ws://${url}/cable`
