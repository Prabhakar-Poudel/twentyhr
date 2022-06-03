import { useQuery, useQueryClient } from 'react-query'
import { axios } from 'src/lib/axios/axios'
import { InterviewNew, InterviewShow } from 'src/types/interview'

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
    ({ queryKey }) => axios.get(`/interviews/${id}`).then(({ data }) => data),
    { retry: false }
  )

  return {
    ...queryResult,
    invalidateInterview: () => queryClient.invalidateQueries(queryKey),
  }
}

export const createInterview = (data?: InterviewNew) =>  axios
  .post<InterviewShow>('/interviews/', { interview: { ...data, status: 'created' } })
  .then((res) => res.data)
