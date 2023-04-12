import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios/axios'

export const useOrganiationsOverviewShow = (id: string) =>
  useQuery(['organizations', id, 'overview'], () => axios.get(`/organizations/${id}/overview`).then(({ data }) => data))
