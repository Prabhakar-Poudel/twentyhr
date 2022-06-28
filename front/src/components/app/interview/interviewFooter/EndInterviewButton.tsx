import { Stop } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import EndInterviewDialog from 'src/components/app/interview/EndInterviewDialog'

interface Props {
  onEndInterview: () => void
}

const EndInterviewButton = ({ onEndInterview }: Props) => {
  const [showEndModal, setShowEndModal] = useState(false)

  const handleClose = () => setShowEndModal(false)

  return (
    <Box>
      <Button color="error" variant="outlined" size="small" startIcon={<Stop />} onClick={() => setShowEndModal(true)}>
        End Interview
      </Button>
      <EndInterviewDialog open={showEndModal} onClose={handleClose} onConfirm={onEndInterview} />
    </Box>
  )
}

export default EndInterviewButton
