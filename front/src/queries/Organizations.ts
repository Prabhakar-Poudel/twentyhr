import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios/axios'

export const useOrganiationsShow = (id: string) =>
  useQuery(['organizations', id], () => axios.get(`/organizations/${id}`).then(({ data }) => data))
