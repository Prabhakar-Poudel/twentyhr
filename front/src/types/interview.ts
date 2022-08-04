import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { QuestionShow } from 'src/types/question'
import { User } from 'src/types/user'

export const InterviewStatuses = {
  archived: 'archived',
  created: 'created',
  ended: 'ended',
  started: 'started',
} as const
export type InterviewStatus = keyof typeof InterviewStatuses

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

export interface InterviewUpdate {
  title?: string
  question_id?: string
  status?: InterviewStatus
}
