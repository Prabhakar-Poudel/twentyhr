import { AppBar, Box } from '@mui/material'
import ActiveUsersList, { ActiveUser } from 'src/components/app/interview/interviewFooter/ActiveUsersList'
import EndInterviewButton from 'src/components/app/interview/interviewFooter/EndInterviewButton'
import InterviewLinkCopy from 'src/components/app/interview/InterviewLinkCopy'
import InterviewNotes from 'src/components/app/interview/interviewFooter/InterviewNotes'
import MoreActions from 'src/components/app/interview/interviewFooter/MoreActions'
import { InterviewStatuses } from 'src/types/interview'

interface Props {
  activeUsers: ActiveUser[]
  canEdit: boolean
  interview: string
  interviewStatus: string
  onEndInterview: () => void
}

const InterviewFooter = ({ activeUsers, canEdit, interview, interviewStatus, onEndInterview }: Props) => {
  const interviewStarted = interviewStatus === InterviewStatuses.started

  return (
    <AppBar position="fixed" component="footer" className="!z-[1300] px-4 py-1 !top-auto !bottom-0">
      <Box className="flex items-center">
        <Box className="grow flex gap-4">
          {canEdit && <InterviewNotes interview={interview} />}
          {interviewStarted && (
            <>
              {activeUsers.length > 1 && <ActiveUsersList activeUsers={activeUsers} />}
              {canEdit && <InterviewLinkCopy link={location.href} />}
            </>
          )}
        </Box>
        {canEdit && interviewStarted && (
          <>
            <EndInterviewButton onEndInterview={onEndInterview} />
            <MoreActions />
          </>
        )}
      </Box>
    </AppBar>
  )
}

export default InterviewFooter
