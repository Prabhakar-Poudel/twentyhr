const port = process.env.REACT_APP_API_PORT
const url = port
  ? `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`
  : `${process.env.REACT_APP_API_HOST}`
export const rootUrl = `http://${url}`
export const wsUrl = `ws://${url}/cable`
