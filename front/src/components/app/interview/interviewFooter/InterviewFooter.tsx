import { Stop } from '@mui/icons-material'
import { AppBar, Box, Button } from '@mui/material'
import { useState } from 'react'
import EndInterviewDialog from 'src/components/app/interview/EndInterviewDialog'
import ActiveUsersList, { ActiveUser } from 'src/components/app/interview/interviewFooter/ActiveUsersList'
import InterviewNotes from 'src/components/app/interview/interviewFooter/InterviewNotes'
import { InterviewStatuses } from 'src/types/interview'

interface Props {
  activeUsers: ActiveUser[]
  interview: string
  interviewStatus: string
  onEndInterview: () => void
}

const InterviewFooter = ({ activeUsers, interview, interviewStatus, onEndInterview }: Props) => {
  const [showEndModal, setShowEndModal] = useState(false)

  const handleClose = () => setShowEndModal(false)

  const handleEndInterview = () => {
    handleClose()
    onEndInterview()
  }

  const interviewStarted = interviewStatus === InterviewStatuses.started

  return (
    <AppBar position="relative" component="footer" className="!flex-row z-[1300] px-4 py-1">
      <Box className="grow flex gap-4 items-center">
        <InterviewNotes interview={interview} />
        {interviewStarted && activeUsers.length > 1 && <ActiveUsersList activeUsers={activeUsers} />}
      </Box>
      {interviewStarted &&
        <Box className="flex items-center">
          <Button color="error" variant="outlined" size="small" startIcon={<Stop/>} onClick={() => setShowEndModal(true)}>
            End Interview
          </Button>
        </Box>
      }
      <EndInterviewDialog open={showEndModal} onClose={handleClose} onConfirm={handleEndInterview} />
    </AppBar>
  )
}

export default InterviewFooter
