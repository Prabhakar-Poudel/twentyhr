export type QuestionStatus = 'draft' | 'published' | 'archived'

export interface QuestionIndex {
  id: string
  title: string
  description?: string
  organization_id: string
  creator_id: string
  status: QuestionStatus
}
