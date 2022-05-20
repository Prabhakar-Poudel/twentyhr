import { Box } from '@mui/material'
import { useParams } from 'react-router'
import AppHeader from 'src/components/app/appHeader/AppHeader'
import QuestionForm from 'src/components/app/questions/QuestionForm'
import { questionTransform } from 'src/dataTransforms/question'
import { axios } from 'src/lib/axios/axios'
import { useQuestionShow } from 'src/queries/Questions'
import { QuestionPayload, QuestionShow, Question } from 'src/types/question'

const EditQuestion = () => {
  const { id } = useParams()
  const { data, isLoading, invalidateQuestion } = useQuestionShow(id as string)

  const updateQuestion = (question: QuestionPayload) =>  axios
      .put<QuestionShow>(`/questions/${id}`, { question })
      .then(res => questionTransform(res.data))
      .then(question => invalidateQuestion().then(() => question))

  if (isLoading) return null

  return (
    <>
      <AppHeader />
      <Box className="my-10">
        <QuestionForm defaultValues={data as Question} onSave={updateQuestion} />
      </Box>
    </>
  )
}

export default EditQuestion
