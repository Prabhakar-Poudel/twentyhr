import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios/axios'

export const useUsersIndex = () => useQuery(['users'], () => axios.get('/users/').then(({ data }) => data))
