import { useQuery, useQueryClient } from 'react-query'
import { axios } from 'src/lib/axios/axios'

export const useQuestionsIndex = () => {
  const queryClient = useQueryClient()
  const queryKey = ['questions']
  const result = useQuery(
    queryKey,
    ({ queryKey }) => axios.get('/interview_questions').then(({ data }) => data)
  )

  return {
    ...result,
    invalidateQuestions: () => queryClient.invalidateQueries(queryKey),
  }
}

export const useQuestionShow = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()
  const queryKey = ['questions', id]
  const queryResult = useQuery(
    queryKey,
    ({ queryKey }) => axios.get(`/interview_questions/${id}`).then(({ data }) => data)
  )

  return {
    ...queryResult,
    invalidateQuestion: () => queryClient.invalidateQueries(queryKey),
  }
}
