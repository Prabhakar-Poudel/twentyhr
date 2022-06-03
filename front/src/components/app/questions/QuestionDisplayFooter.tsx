import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { createInterview } from 'src/queries/Interviews'

const QuestionDisplayFooter = ({ id }: { id: string }) => {
  const navigate = useNavigate()

  const onCreateNewInterview = async () => {
    const interview = await createInterview({ question_id: id })
    navigate(`/interviews/${interview.id}`)
  }

  return (
    <Box className="flex flex-row-reverse py-2">
      <Button onClick={onCreateNewInterview}>Create interview</Button>
    </Box>
  )
}

export default QuestionDisplayFooter
