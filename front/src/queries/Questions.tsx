import { useQuery, useQueryClient } from 'react-query'
import { questionTransform } from 'src/dataTransforms/question'
import { axios } from 'src/lib/axios/axios'

export const useQuestionsIndex = () => {
  const queryClient = useQueryClient()
  const queryKey = ['questions']
  const result = useQuery(
    queryKey,
    ({ queryKey }) => axios.get('/questions').then(({ data }) => data)
  )

  return {
    ...result,
    invalidateQuestions: () => queryClient.invalidateQueries(queryKey),
  }
}

export const useQuestionShow = (id: string) => {
  const queryClient = useQueryClient()
  const queryKey = ['questions', id]
  const queryResult = useQuery(
    queryKey,
    ({ queryKey }) => axios.get(`/questions/${id}`).then(({ data }) => questionTransform(data))
  )

  return {
    ...queryResult,
    invalidateQuestion: () => queryClient.invalidateQueries(queryKey),
  }
}
