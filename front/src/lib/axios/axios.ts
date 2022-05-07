import axiosLib from 'axios'

export const axios = axiosLib.create({
  baseURL: 'http://localhost:3100/',
  timeout: 3000,
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
  withCredentials: true
})
