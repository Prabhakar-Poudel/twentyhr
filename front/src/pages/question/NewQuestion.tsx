import { Box } from '@mui/material'
import AppHeader from 'src/components/app/appHeader/AppHeader'
import QuestionForm from 'src/components/app/questions/QuestionForm'
import { axios } from 'src/lib/axios/axios'
import { QuestionPayload, QuestionShow } from 'src/types/question'

const NewQuestion = () => {
  const createQuestion = (question: QuestionPayload) =>  axios
    .post<QuestionShow>('/questions/', { question })
    .then((res) => res.data)
  const defaultValues = {}

  return (
    <>
      <AppHeader />
      <Box className="my-10">
        <QuestionForm defaultValues={defaultValues} onSave={createQuestion} />
      </Box>
    </>
  )
}

export default NewQuestion
