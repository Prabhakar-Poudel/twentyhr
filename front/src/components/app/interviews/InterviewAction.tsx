import MovieIcon from '@mui/icons-material/Movie'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import { Box, Button } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EndInterviewDialog from 'src/components/app/interview/EndInterviewDialog'
import InterviewLinkCopy from 'src/components/app/interview/InterviewLinkCopy'
import { updateInterview, useInterviewsIndex } from 'src/queries/Interviews'
import { InterviewStatuses } from 'src/types/interview'

export const InterviewAction = ({ row }: GridRenderCellParams) => {
  const navigate = useNavigate()
  const { invalidateInterviews } = useInterviewsIndex()
  const [showEndModal, setShowEndModal] = useState(false)
  const [status, setStatus] = useState(row.status)

  const handleClose = () => setShowEndModal(false)
  const handleOpenModal = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setShowEndModal(true)
  }

  const openInterview = () => navigate(`/interviews/${row.id}`)

  const handleEndInterview = () => {
    handleClose()
    invalidateInterviews()
    updateInterview(row.id, { status: InterviewStatuses.ended })
    setStatus(InterviewStatuses.ended)
  }

  const startInterview = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    updateInterview(row.id, { status: InterviewStatuses.started })
    invalidateInterviews()
    openInterview()
  }

  return (
    <Box className="shrink-0">
      <InterviewLinkCopy link={`${location.href}/${row.id}`} />
      {status === InterviewStatuses.started && (
        <>
          <Button className="w-24" color="error" variant="outlined" startIcon={<StopIcon />} onClick={handleOpenModal}>
            End
          </Button>
          <EndInterviewDialog open={showEndModal} onClose={handleClose} onConfirm={handleEndInterview} />
        </>
      )}
      {status === InterviewStatuses.ended && (
        <Button disabled className="w-24" color="info" variant="outlined" startIcon={<MovieIcon />}>
          View
        </Button>
      )}
      {status === InterviewStatuses.created && (
        <Button className="w-24" variant="outlined" startIcon={<PlayArrowIcon />} onClick={startInterview}>
          Start
        </Button>
      )}
    </Box>
  )
}
