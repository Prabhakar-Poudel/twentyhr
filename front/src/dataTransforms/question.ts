import { Question, QuestionShow } from 'src/types/question'

export const questionTransform = (question: QuestionShow): Question => {
  const { id, title, description, guidelines, instruction, language, status } = question
  return {
    id,
    title,
    description,
    guidelines,
    instruction,
    language,
    status,
    starterCode: question.initial_code,
    creatorId: question.creator_id,
    organizationId: question.organization_id,
  }
}
