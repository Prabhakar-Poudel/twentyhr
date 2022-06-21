export interface Note {
  id: string
  content: string
  author_id: string
  interview_id: string
}

export interface NewNote {
  content: string
  interview_id: string
}
