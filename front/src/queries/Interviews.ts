import { useQuery, useQueryClient } from 'react-query'
import { axios } from 'src/lib/axios/axios'
import { InterviewNew, InterviewShow, InterviewUpdate } from 'src/types/interview'
import { Note } from 'src/types/note'

export const useInterviewsIndex = () => {
  const queryClient = useQueryClient()
  const queryKey = ['interviews']
  const result = useQuery(queryKey, ({ queryKey }) => axios.get('/interviews').then(({ data }) => data))

  return {
    ...result,
    invalidateInterviews: () => queryClient.invalidateQueries(queryKey),
  }
}

export const useInterviewShow = (id: string) => {
  const queryClient = useQueryClient()
  const queryKey = ['interviews', id]
  const queryResult = useQuery(queryKey, ({ queryKey }) => axios.get(`/interviews/${id}`).then(({ data }) => data), {
    retry: false,
  })

  return {
    ...queryResult,
    invalidateInterview: () => queryClient.invalidateQueries(queryKey),
  }
}

export const noteForInterview = (id: string) =>
  axios.get<Note | null>(`interviews/${id}/note/`)
    .then((res) => res.data)
    .catch(() => null)


export const createInterview = (data?: InterviewNew) =>
  axios.post<InterviewShow>('/interviews/', { interview: { ...data, status: 'created' } }).then((res) => res.data)

export const updateInterview = (id: string, data: InterviewUpdate) =>
  axios.put<InterviewShow>(`/interviews/${id}`, { interview: data }).then((res) => res.data)