import axiosLib from 'axios'
import { rootUrl } from 'src/config/application'

export const axios = axiosLib.create({
  baseURL: rootUrl,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true,
})
