import { Box, Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import InterviewTitle from 'src/components/app/interview/interviewHeader/InterviewTitle'
import QuestionsDropdown from 'src/components/app/interview/interviewHeader/QuestionsDropdown'
import { InterviewStatuses } from 'src/types/interview'
import { QuestionShow } from 'src/types/question'

interface Props {
  currentQuestion?: QuestionShow
  interviewStatus: string
  onBeginInterview: () => void
  onQuestionChanged: (questionId: string) => void
  onTitleChanged: (title: string) => void
  title: string
}

const InterviewHeader = ({
  currentQuestion,
  interviewStatus,
  onBeginInterview,
  onQuestionChanged,
  onTitleChanged,
  title,
}: Props) => {
  const readOnly = interviewStatus !== InterviewStatuses.started
  const newInterview = interviewStatus === InterviewStatuses.created

  const onTitleChange = (title: string) => {
    if (!title.length) return
    onTitleChanged(title)
  }

  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <Box className="grow flex items-center gap-4 mb-0.5">
          <InterviewTitle onChange={onTitleChange} value={title} />
          {!readOnly && <QuestionsDropdown currentQuestion={currentQuestion} onChange={onQuestionChanged} />}
          {newInterview && (
            <Button variant="contained" onClick={onBeginInterview}>
              Begin Interview
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default InterviewHeader
