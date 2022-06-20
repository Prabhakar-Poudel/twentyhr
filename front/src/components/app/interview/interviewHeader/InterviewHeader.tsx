import { Box } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import InterviewTitle from 'src/components/app/interview/interviewHeader/InterviewTitle'
import QuestionsDropdown from 'src/components/app/interview/interviewHeader/QuestionsDropdown'
import { QuestionShow } from 'src/types/question'

interface Props {
  currentQuestion?: QuestionShow
  onTitleChanged: (title: string) => void
  onQuestionChanged: (questionId: string) => void
  title: string
}

function InterviewHeader({ currentQuestion, onQuestionChanged, title, onTitleChanged }: Props) {
  const onTitleChange = (title: string) => {
    if (!title.length) return
    onTitleChanged(title)
  }

  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <Box className="flex grow gap-4 mb-0.5">
          <InterviewTitle value={title} onChange={onTitleChange} />
          <QuestionsDropdown onChange={onQuestionChanged} currentQuestion={currentQuestion} />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default InterviewHeader
