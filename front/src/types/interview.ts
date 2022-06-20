import { ExcalidrawElement } from '@excalidraw/excalidraw-next/types/element/types'
import { QuestionShow } from 'src/types/question'
import { User } from 'src/types/user'

export type InterviewStatus = 'new' | 'started' | 'ended' | 'archived'

export interface InterviewIndex {
  id: string
  title: string
  organization_id: string
  creator: User
  question_id: string
  status: InterviewStatus
}

export interface InterviewNew {
  title?: string
  question_id?: string
}

interface InterviewBase {
  id: string
  title: string
  status: InterviewStatus
  question: QuestionShow
  code: string
  drawing: ExcalidrawElement[]
}

export interface InterviewShow extends InterviewBase {
  organization_id: string
  creator_id: string
  created_at: string
  updated_at: string
}
