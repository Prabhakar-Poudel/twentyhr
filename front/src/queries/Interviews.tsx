import { useQuery, useQueryClient } from 'react-query'
import { interviewTransform } from 'src/dataTransforms/interview'
import { axios } from 'src/lib/axios/axios'

export const useInterviewsIndex = () => {
  const queryClient = useQueryClient()
  const queryKey = ['interviews']
  const result = useQuery(
    queryKey,
    ({ queryKey }) => axios.get('/interviews').then(({ data }) => data)
  )

  return {
    ...result,
    invalidateInterviews: () => queryClient.invalidateQueries(queryKey),
  }
}

export const useInterviewShow = (id: string) => {
  const queryClient = useQueryClient()
  const queryKey = ['interviews', id]
  const queryResult = useQuery(
    queryKey,
    ({ queryKey }) => axios.get(`/interviews/${id}`).then(({ data }) => interviewTransform(data)),
    { retry: false }
  )

  return {
    ...queryResult,
    invalidateInterview: () => queryClient.invalidateQueries(queryKey),
  }
}
