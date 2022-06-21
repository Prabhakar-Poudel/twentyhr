import { useQuery, useQueryClient } from 'react-query'
import { axios } from 'src/lib/axios/axios'
import { NewNote, Note } from 'src/types/note'

export const useNoteIndex = () => {
  const queryClient = useQueryClient()
  const queryKey = ['notes']
  const result = useQuery(queryKey, ({ queryKey }) => axios.get('/notes').then(({ data }) => data))

  return {
    ...result,
    invalidateInterviews: () => queryClient.invalidateQueries(queryKey),
  }
}

export const useNoteShow = (id: string) => {
  const queryClient = useQueryClient()
  const queryKey = ['notes', id]
  const queryResult = useQuery(queryKey, ({ queryKey }) => axios.get(`/notes/${id}`).then(({ data }) => data), {
    retry: false,
  })

  return {
    ...queryResult,
    invalidateInterview: () => queryClient.invalidateQueries(queryKey),
  }
}

export const createNote = (note: NewNote) =>
  axios.post<Note>('/notes/', { note }).then((res) => res.data)

export const updateNote = (id: string, content: string) =>
  axios.put<Note>(`/notes/${id}`, { note: { content } }).then((res) => res.data)
