import { Box, Typography } from '@mui/material'
import QuestionDisplayFooter from 'src/components/app/questions/QuestionDisplayFooter'
import QuestionDisplayTab from 'src/components/app/questions/QuestionDisplayTab'
import { RowActions } from 'src/components/app/questions/RowActions'
import { QuestionShow } from 'src/types/question'

interface Props {
  id: string
  question: QuestionShow
}

const QuestionDisplay = ({ id, question }: Props) => {
  return (
    <Box className="flex flex-col px-10 pt-5 h-full">
      <Box>
        <Box className="flex justify-between">
          <Typography component="h2" variant="h4" className="truncate ...">{question.title}</Typography>
          <RowActions id={id} />
        </Box>
        <Typography>{question.description}</Typography>
      </Box>
      <QuestionDisplayTab question={question} />
      <QuestionDisplayFooter id={id} />
    </Box>
  )
}

export default QuestionDisplay
