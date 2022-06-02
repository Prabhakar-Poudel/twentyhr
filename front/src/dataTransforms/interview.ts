import { Interview, InterviewShow } from 'src/types/interview'

export const interviewTransform = (interview: InterviewShow): Interview => {
  const { id, title, status, question } = interview
  return {
    id,
    title,
    status,
    question,
    creatorId: interview.creator_id,
    organizationId: interview.organization_id,
  }
}
