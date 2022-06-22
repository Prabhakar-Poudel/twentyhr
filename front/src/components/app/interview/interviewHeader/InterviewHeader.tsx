import { Box } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import InterviewTitle from 'src/components/app/interview/interviewHeader/InterviewTitle'
import QuestionsDropdown from 'src/components/app/interview/interviewHeader/QuestionsDropdown'
import { InterviewStatus } from 'src/types/interview'
import { QuestionShow } from 'src/types/question'

interface Props {
  currentQuestion?: QuestionShow
  interviewStatus: string
  onQuestionChanged: (questionId: string) => void
  onTitleChanged: (title: string) => void
  title: string
}

function InterviewHeader({ currentQuestion, interviewStatus, onQuestionChanged, onTitleChanged, title }: Props) {
  const readOnly = interviewStatus !== InterviewStatus.started

  const onTitleChange = (title: string) => {
    if (!title.length) return
    onTitleChanged(title)
  }

  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <Box className="flex grow gap-4 mb-0.5">
          <InterviewTitle onChange={onTitleChange} value={title} />
          {!readOnly && <QuestionsDropdown currentQuestion={currentQuestion} onChange={onQuestionChanged} />}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default InterviewHeader
