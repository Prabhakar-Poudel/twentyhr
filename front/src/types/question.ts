import { User } from 'src/types/user'

export type QuestionStatus = 'draft' | 'published' | 'archived'

export interface QuestionIndex {
  id: string
  title: string
  description?: string
  organization_id: string
  creator: User
  status: QuestionStatus
}

export interface QuestionNew {
  guidelines?: string
  title?: string
  description?: string
  starterCode?: string
  instruction?: string
  language?: string
}

export interface QuestionPayload {
  guidelines?: string
  title: string
  description?: string
  initial_code?: string
  instruction?: string
  language?: string
}

interface QuestionBase {
  id: string
  title: string
  description?: string
  guidelines?: string
  instruction?: string
  language?: string
  status: QuestionStatus
}

export interface QuestionShow extends QuestionBase {
  initial_code?: string
  organization_id: string
  creator_id: string
  created_at: string
  updated_at: string
}

export interface Question extends QuestionBase {
  starterCode?: string
  creatorId: string
  organizationId: string
}
