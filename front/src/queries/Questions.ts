import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios/axios'

export const useQuestionsIndex = () => useQuery(['questions'], () => axios.get('/questions').then(({ data }) => data))

export const useQuestionShow = (id: string) =>
  useQuery(['questions', id], () => axios.get(`/questions/${id}`).then(({ data }) => data))
