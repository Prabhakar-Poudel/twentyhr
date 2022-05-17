import { Box } from '@mui/material'
import AppHeader from 'src/components/app/appHeader/AppHeader'
import QuestionForm from 'src/components/app/questions/QuestionForm'

const NewQuestion = () => {
  return (
    <>
      <AppHeader />
      <Box className="my-10">
        <QuestionForm />
      </Box>
    </>
  )
}

export default NewQuestion
