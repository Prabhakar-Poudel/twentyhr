import { Stop } from '@mui/icons-material'
import { AppBar, Box, Button } from '@mui/material'
import InterviewNotes from 'src/components/app/interview/interviewFooter/InterviewNotes'

const InterviewFooter = () => {
  return (
    <AppBar position="relative" component="footer" className="!flex-row z-[1300] px-4 py-1">
      <Box className="grow">
        <InterviewNotes />
      </Box>
      <Box className="flex items-center">
        <Button color="error" variant="outlined" size="small" startIcon={<Stop />}>End Interview</Button>
      </Box>
    </AppBar>
  )
}

export default InterviewFooter
