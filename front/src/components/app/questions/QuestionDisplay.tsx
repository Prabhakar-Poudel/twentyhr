import { Box, Typography } from '@mui/material'
import QuestionDisplayFooter from 'src/components/app/questions/QuestionDisplayFooter'
import QuestionDisplayTab from 'src/components/app/questions/QuestionDisplayTab'
import { RowActions } from 'src/components/app/questions/RowActions'
import { QuestionShow } from 'src/types/question'

interface Props {
  id: string
  data: QuestionShow
}

const QuestionDisplay = ({ id, data }: Props) => {
  return (
    <Box className="flex flex-col px-10 pt-5 h-full">
      <Box>
        <Box className="flex justify-between">
          <Typography component="h2" variant="h4" className="truncate ...">{data.title}</Typography>
          <RowActions id={id} />
        </Box>
        <Typography>{data.description}</Typography>
      </Box>
      <QuestionDisplayTab question={data} />
      <QuestionDisplayFooter />
    </Box>
  )
}

export default QuestionDisplay
