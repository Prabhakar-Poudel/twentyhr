import { User } from 'src/types/user'

export type QuestionStatus = 'draft' | 'published' | 'archived'

export interface QuestionIndex {
  creator: User
  description?: string
  id: string
  organization_id: string
  status: QuestionStatus
  title: string
}

export interface QuestionNew {
  description?: string
  guidelines?: string
  instruction?: string
  language?: string
  starterCode?: string
  title?: string
}

export interface QuestionPayload {
  description?: string
  guidelines?: string
  initial_code?: string
  instruction?: string
  language?: string
  title: string
}

export interface QuestionShow extends QuestionPayload {
  created_at: string
  creator_id: string
  id: string
  organization_id: string
  status: QuestionStatus
  updated_at: string
}
