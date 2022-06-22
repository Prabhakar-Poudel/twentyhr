import { Stop } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useState } from 'react'
import ActiveUsersList, { ActiveUser } from 'src/components/app/interview/interviewFooter/ActiveUsersList'
import InterviewNotes from 'src/components/app/interview/interviewFooter/InterviewNotes'
import { InterviewStatus } from 'src/types/interview'

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

  const interviewStarted = interviewStatus === InterviewStatus.started

  return (
    <AppBar position="relative" component="footer" className="!flex-row z-[1300] px-4 py-1">
      <Box className="grow flex gap-4">
        <InterviewNotes interview={interview}/>
        {interviewStarted && activeUsers.length > 1 && <ActiveUsersList activeUsers={activeUsers}/>}
      </Box>
      {interviewStarted &&
        <Box className="flex items-center">
          <Button color="error" variant="outlined" size="small" startIcon={<Stop/>} onClick={() => setShowEndModal(true)}>
            End Interview
          </Button>
        </Box>
      }
      <Dialog
        open={showEndModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          End this interview
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The interview will be read only and it will not be accessible outside your organization. <br />
            You can view the interview back in future.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Cancel</Button>
          <Button onClick={handleEndInterview} color="error">End interview</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  )
}

export default InterviewFooter
