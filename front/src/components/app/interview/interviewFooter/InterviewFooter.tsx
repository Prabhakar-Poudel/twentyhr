import { Stop } from '@mui/icons-material'
import { AppBar, Box, Button } from '@mui/material'
import ActiveUsersList, { ActiveUser } from 'src/components/app/interview/interviewFooter/ActiveUsersList'
import InterviewNotes from 'src/components/app/interview/interviewFooter/InterviewNotes'

interface Props {
  activeUsers: ActiveUser[]
}

function InterviewFooter({ activeUsers }: Props) {
  return (
    <AppBar position="relative" component="footer" className="!flex-row z-[1300] px-4 py-1">
      <Box className="grow flex gap-4">
        <InterviewNotes />
        <ActiveUsersList activeUsers={activeUsers} />
      </Box>
      <Box className="flex items-center">
        <Button color="error" variant="outlined" size="small" startIcon={<Stop />}>
          End Interview
        </Button>
      </Box>
    </AppBar>
  )
}

export default InterviewFooter
