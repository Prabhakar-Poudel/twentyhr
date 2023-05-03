import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios/axios'
import { NewNote, Note } from 'src/types/note'

export const useNoteIndex = () => useQuery(['notes'], () => axios.get('/notes').then(({ data }) => data))

export const useNoteShow = (id: string) =>
  useQuery(['notes', id], () => axios.get(`/notes/${id}`).then(({ data }) => data))

export const createNote = (note: NewNote) => axios.post<Note>('/notes/', { note }).then((res) => res.data)

export const updateNote = (id: string, content: string) =>
  axios.put<Note>(`/notes/${id}`, { note: { content } }).then((res) => res.data)
