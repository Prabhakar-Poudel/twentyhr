import { Box, LinearProgress, Modal, Paper } from '@mui/material'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import QuestionDisplay from 'src/components/app/questions/QuestionDisplay'
import useToast from 'src/hooks/useToast'
import { useQuestionShow } from 'src/queries/Questions'

const ViewQuestion = () => {
  const { id } = useParams()
  const { data, isLoading, error } = useQuestionShow(id!)
  const navigate = useNavigate()
  const toast = useToast()
  const closeQuestion = () => navigate('/questions/')

  if (error) {
    if (error instanceof Error) {
      toast({ message: error.message, type: 'error' })
    }
    closeQuestion()
  }

  return (
    <Modal open onClose={closeQuestion} className="flex justify-center">
      <Paper elevation={24} className="w-3/4">
        {isLoading && <Box><LinearProgress /></Box>}
        {data && <QuestionDisplay id={id!} data={data!} />}
      </Paper>
    </Modal>
  )
}

export default ViewQuestion
